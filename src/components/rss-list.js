import { AddToItemListEvent, ItemList } from './item-list';
import { RssUri } from './rss-uri';
import { DomNode } from './dom-node';
import Rx from 'rxjs';
import { ComponentStream } from './component-stream';

export function RssList() {
  const rssList = ItemList();
  const rssUri = RssUri();

  const rssListContainer = DomNode('<div></div>');
  rssListContainer.appendChild(rssList.component);
  rssListContainer.appendChild(rssUri.component);

  rssUri.stream.subscribe(feed => rssList.component.dispatchEvent(AddToItemListEvent(feed)));

  const stream = Rx.Observable.merge(
    rssUri.stream.map(feed => ({'added': feed})),
    rssList.stream.map(feed => ({'removed': feed})),
  );

  return ComponentStream(rssListContainer, stream);
}

