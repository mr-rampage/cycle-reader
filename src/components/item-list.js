import { DomNode } from './dom-node';
import Rx from 'rxjs/Rx';
import { ComponentStream } from './component-stream';

export function AppendableItemList(addItem$) {
  const list = DomNode('<ul></ul>');
  addItemObservable(addItem$, list);

  const removeItem$ = createRemoveItem$(list);
  removeItem$.subscribe(item => list.removeChild(item));

  const itemList$ = Rx.Observable.merge(
    removeItem$.map(item => ({'removed': item.textContent})),
    addItem$.map(item => ({'added': item}))
  ).share();

  return ComponentStream(list, itemList$);
}

function Item(description) {
  return DomNode(`<li>${description}</li>`);
}

function createRemoveItem$(list) {
  return Rx.Observable.fromEvent(list, 'click').filter(event => /li/i.test(event.srcElement.tagName)).pluck('srcElement');
}

function addItemObservable(addItem$, list) {
  return addItem$.subscribe(item => list.appendChild(Item(item)));
}
