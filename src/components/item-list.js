import { DomNode } from './dom-node';
import Rx from 'rxjs/Rx';
import { ComponentStream } from './component-stream';

export function AppendableItemList(addItem$) {
  const list = DomNode('<ul></ul>');

  addItem$.subscribe(item => list.appendChild(Item(item)));

  const removeItem$ = Rx.Observable.fromEvent(list, 'click')
    .filter(event => /li/i.test(event.srcElement.tagName))
    .pluck('srcElement');

  removeItem$.subscribe(item => list.removeChild(item));

  const stream = Rx.Observable.merge(
    removeItem$.map(item => ({'removed': item.textContent})),
    addItem$.map(item => ({'added': item}))
  ).share();

  return ComponentStream(list, stream);
}

function Item(description) {
  return DomNode(`<li>${description}</li>`);
}
