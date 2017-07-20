export function fragmentFromString(strHTML) {
  return document.createRange()
    .createContextualFragment(strHTML)
    .firstElementChild;
}

export function SingletonFactory(factoryMethod) {
  let component;

  return function(...args) {
    component = component || factoryMethod.apply(null, args);
    return component;
  };
}

