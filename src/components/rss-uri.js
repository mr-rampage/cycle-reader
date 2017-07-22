import Rx from 'rxjs/Rx';
import { DomNode } from './dom-node';
import { ComponentStream } from './component-stream';

const INPUT_NAME = 'feedUri';

const template = `
<form>
  <label>Add feed</label>
  <input name='${INPUT_NAME}' />
  <input type='reset' value='Reset'/>
  <input type='submit' value='Add feed'/>
</form>
`;

export function RssUri() {
  const form = DomNode(template);

  const formStream = Rx.Observable.fromEvent(form, 'submit')
    .do(event => event.preventDefault())
    .map(event => ({event: event, value: event.srcElement.elements[INPUT_NAME].value}))
    .share();

  formStream
    .pluck('event', 'target', 'elements', INPUT_NAME)
    .subscribe(input => input.value = '');

  const feedStream = formStream
    .pluck('value')
    .distinctUntilChanged();

  return ComponentStream(form, feedStream);
}
