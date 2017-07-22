import { RssUri } from './rss-uri';

describe('RssUri', () => {

  const fixture = RssUri();

  beforeEach(() => {
    fixture.component.elements.feedUri.value = 'RSS URI';
  });

  it('should emit a value on submit', () => {
    fixture.stream.subscribe(value => expect(value).toBe('RSS URI'));
    fixture.component.querySelector('[type="submit"]').click();
  });


  it('should clear the input', () => {
    fixture.component.querySelector('[type="submit"]').click();
    expect(fixture.component.elements.feedUri.value).toEqual('');
  });

});