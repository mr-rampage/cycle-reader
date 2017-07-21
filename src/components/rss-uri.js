import Rx from 'rxjs/Rx';
import { DomNode } from './dom-node';
import { ComponentStream } from './component-stream';

const template = `
<form>
  <label>Add feed</label>
  <input type='text' name='feedUri' />
  <input type='reset' value='Reset'/>
  <input type='submit' value='Add feed'/>
</form>
`;

export function RssUri() {
  const node = DomNode(template);

  const formStream = Rx.Observable.fromEvent(node, 'submit');
  formStream.subscribe(event => event.preventDefault());

  const feedStream = formStream
    .pluck('target', 'elements', 'feedUri', 'value')
    .distinctUntilChanged();

  return ComponentStream(node, feedStream);
}
