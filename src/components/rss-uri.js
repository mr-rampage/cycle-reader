import Rx from 'rxjs/Rx';
import { DomNode } from './dom-node';
import { ComponentStream } from './component-stream';

const template = `
<form>
  <label>Add feed</label>
  <input type='text' name='feedUri' />
  <input type='submit' value='Add feed'/>
</form>
`;

export function RssUri() {
  const node = DomNode(template);

  const stream = Rx.Observable.fromEvent(node, 'submit');
  stream.subscribe(event => event.preventDefault());

  return ComponentStream(node, stream
    .map(event => event.target.elements.feedUri.value)
    .distinctUntilChanged());
}

