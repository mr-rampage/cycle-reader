import { RssUri } from './rss-uri';

describe('RssUri', () => {

  const fixture = RssUri();

  it('should emit a value on submit', () => {
    fixture.stream.subscribe(value => expect(value).toBe('RSS URI'));
    fixture.component.elements.feedUri.value = 'RSS URI';
    fixture.component.querySelector('[type="submit"]').click();
  });

});