import { AppendableItemList } from './item-list';
import { RssUri } from './rss-uri';
import { DomNode } from './dom-node';
import { ComponentStream } from './component-stream';
import { RssFeedService } from './rss-feed.service';
import { RssFeed } from './rss-feed';

export function RssList() {
  const rssUri = RssUri();
  const rssList = AppendableItemList(rssUri.stream);

  const newFeed$ = rssList.stream
    .filter(event => event.added)
    .pluck('added')
    .flatMap(RssFeedService.fetch);

  const rssFeed = RssFeed(newFeed$);

  const rssListContainer = DomNode('<div></div>');
  rssListContainer.appendChild(rssList.component);
  rssListContainer.appendChild(rssUri.component);
  rssListContainer.appendChild(rssFeed.component);

  return ComponentStream(rssListContainer, rssList.stream);
}

