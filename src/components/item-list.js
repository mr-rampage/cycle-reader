import { DomNode } from './dom-node';
import Rx from 'rxjs/Rx';
import { ComponentStream } from './component-stream';

const ADD_ITEM_TO_LIST_EVENT = 'ADD_ITEM';

export function ItemList() {
  const list = AppendableList('<ul></ul>', ADD_ITEM_TO_LIST_EVENT);

  const stream = Rx.Observable.fromEvent(list, 'click')
    .filter(event => /li/i.test(event.srcElement.tagName))
    .pluck('srcElement');
  stream.subscribe(item => list.removeChild(item));

  return ComponentStream(list, stream.map(item => item.textContent));
}

export function AddToItemListEvent(description) {
  return new CustomEvent(ADD_ITEM_TO_LIST_EVENT, {detail: description});
}

function AppendableList(template, appendEventName) {
  const list = DomNode(template);
  list.addEventListener(appendEventName, event => list.appendChild(Item(event.detail)));
  return list;
}

function Item(description) {
  return DomNode(`<li>${description}</li>`);
}
