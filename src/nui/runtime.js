export class Runtime {
  constructor() {
    this.signalValues = [];
    this.signalSubscribers = {};
    this.effects = [];
    this.runningEffect = undefined;
  }

  runEffect(effectId) {
    const prevEffect = this.runningEffect;
    this.runningEffect = effectId;

    this.effects[effectId]();

    this.runningEffect = prevEffect;
  }

  createEffect(effect) {
    this.effects.push(effect);

    const effectId = this.effects.length - 1;
    this.runEffect(effectId);
  }

  createSignal(initialValue) {
    this.signalValues.push(initialValue);

    const rt = this;
    const signalId = this.signalValues.length - 1;

    return {
      get() {
        const value = rt.signalValues[signalId];

        if (rt.runningEffect !== undefined) {
          const subs = rt.signalSubscribers[signalId] ?? new Set();
          subs.add(rt.runningEffect);
          rt.signalSubscribers[signalId] = subs;
        }

        return value;
      },
      set(value) {
        rt.signalValues[signalId] = value;

        const subs = rt.signalSubscribers[signalId];
        if (subs) {
          for (const sub of subs) {
            rt.runEffect(sub);
          }
        }
      },
      update(fn) {
        rt.signalValues[signalId] = fn(rt.signalValues[signalId])

        const subs = rt.signalSubscribers[signalId];
        if (subs) {
          for (const sub of subs) {
            rt.runEffect(sub);
          }
        }
      }
    }
  }
}
