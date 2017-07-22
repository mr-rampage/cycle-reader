import { AppendableItemList } from './item-list';
import { RssUri } from './rss-uri';
import { DomNode } from './dom-node';
import { ComponentStream } from './component-stream';

export function RssList() {
  const rssUri = RssUri();
  const rssList = AppendableItemList(rssUri.stream);

  const rssListContainer = DomNode('<div></div>');
  rssListContainer.appendChild(rssList.component);
  rssListContainer.appendChild(rssUri.component);

  return ComponentStream(rssListContainer, rssList.stream);
}

