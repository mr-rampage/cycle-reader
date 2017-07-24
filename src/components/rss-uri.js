import Rx from 'rxjs/Rx';
import { DomNode } from './dom-node';
import { ComponentStream } from './component-stream';

const INPUT_NAME = 'feedUri';

const template = `
<form>
  <label>Add feed</label>
  <input name='${INPUT_NAME}' />
  <input type='submit' value='Add feed'/>
</form>
`;

export function RssUri() {
  const form = DomNode(template);

  const form$ = Rx.Observable.fromEvent(form, 'submit')
    .do(event => event.preventDefault())
    .filter(event => hasValidUri(event.srcElement.elements[INPUT_NAME].value))
    .map(event => ({event: event, value: event.srcElement.elements[INPUT_NAME].value}))
    .share();

  form$
    .pluck('event', 'target', 'elements', INPUT_NAME)
    .subscribe(input => input.value = '');

  const newFeed$ = form$
    .pluck('value')
    .distinctUntilChanged();

  return ComponentStream(form, newFeed$);
}

function hasValidUri(uri) {
  return uri && /^(http)/i.test(uri);
}
