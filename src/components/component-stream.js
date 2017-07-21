
export function ComponentStream(component, stream) {
  return Object.freeze({
    get component() { return component },
    get stream() { return stream }
  });
}
