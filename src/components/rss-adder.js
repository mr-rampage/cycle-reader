import Rx from 'rxjs/Rx';
import { fragmentFromString, SingletonFactory } from './component-utils.js';

const template = `
<form>
  <label>Add feed</label>
  <input type='text' name='feedUri' />
  <input type='submit' value='Add feed'/>
</form>
`;

export const RssUri = SingletonFactory(createRssUriStream);

function createRssUriStream(parent = document.body) {
  const node = parent.appendChild(fragmentFromString(template))
  const stream = Rx.Observable.fromEvent(node, 'submit');
  stream.subscribe(event => event.preventDefault());
  return stream
    .map(event => event.target.elements.feedUri.value)
    .distinctUntilChanged();
}

