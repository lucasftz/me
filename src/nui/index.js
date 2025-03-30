export * from './ui.js';

import { Runtime } from './runtime.js';

const rt = new Runtime();

export function createEffect(effect) {
  rt.createEffect(effect);
}

export function createSignal(initialValue) {
  return rt.createSignal(initialValue);
}
