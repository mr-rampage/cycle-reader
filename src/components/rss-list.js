import { AppendableItemList } from './item-list';
import { RssUri } from './rss-uri';
import { DomNode } from './dom-node';
import { ComponentStream } from './component-stream';
import { RssFeed } from './rss-feed';

export function RssList() {
  const rssUri = RssUri();
  const rssList = AppendableItemList(rssUri.stream);
  const rssFeed = RssFeed(createAddedFeed$(rssList.stream));

  const rssListContainer = DomNode('<div></div>');
  rssListContainer.appendChild(rssList.component);
  rssListContainer.appendChild(rssUri.component);
  rssListContainer.appendChild(rssFeed.component);

  return ComponentStream(rssListContainer, rssList.stream);
}

function createAddedFeed$(rssList$) {
  return rssList$.filter(event => event.added).pluck('added');
}