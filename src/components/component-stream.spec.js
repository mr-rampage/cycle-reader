import { ComponentStream } from './component-stream';

describe('ComponentStream', () => {

  it('should create a frozen component stream', () => {
    const actual = ComponentStream({}, {});
    expect(actual).toBeTruthy();
    expect(Object.isFrozen(actual)).toBeTruthy();
  });

});