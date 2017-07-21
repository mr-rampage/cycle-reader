import { DomNode } from './dom-node';

describe('DomNode', () => {

  it('should create a DOM node from a string', () => {
    const actual = DomNode('<p></p>');
    expect(actual).toBeTruthy();
  });

});