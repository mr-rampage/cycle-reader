import { RssUri } from './rss-uri';

describe('RssUri', () => {

  const fixture = RssUri();

  beforeEach(() => {
    fixture.component.elements.feedUri.value = 'http://rss.com';
  });

  it('should emit a value on submit', () => {
    fixture.stream.subscribe(value => expect(value).toBe('http://rss.com'));
    fixture.component.querySelector('[type="submit"]').click();
  });


  it('should clear the input', () => {
    fixture.component.querySelector('[type="submit"]').click();
    expect(fixture.component.elements.feedUri.value).toEqual('');
  });

  it('should not emit a value on invalid uri', () => {
    fixture.stream.subscribe(() => fail('Invalid url should not appear on stream.'));
    fixture.component.elements.feedUri.value = 'invalid uri';
    fixture.component.querySelector('[type="submit"]').click();
    expect(fixture.component.elements.feedUri.value).toBe('invalid uri');
  });

});