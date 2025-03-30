function createElement(name, attrs, ...children) {
  const el = document.createElement(name)

  for (const key in attrs) {
    if (key.startsWith("on")) {
      el.addEventListener(key.substring(2), attrs[key])
    } else if (key === "bind") {
      attrs["bind"].set(el);
    } else {
      el.setAttribute(key, attrs[key])
    }
  }

  for (const child of children) {
    el.append(child)
  }

  return el;
}

export const ui = new Proxy({}, {
  get(_target, tagName, _receiver) {
    if (typeof tagName !== "string") {
      return;
    }

    return (attrs, ...children) => createElement(tagName, attrs, ...children);
  }
})
