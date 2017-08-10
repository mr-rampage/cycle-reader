import { ComponentStream } from './component-stream';
import { DomNode } from './dom-node';
import { RssFeedService } from './rss-feed.service';
import Rx from 'rxjs';

export function RssFeed(addedFeed$) {
  const rssFeedContainer = DomNode('<ul></ul>');
  const article$ = RssFeedService.fetch$(addedFeed$);
  RenderArticleObserver(article$, rssFeedContainer);

  const newArticle$ = Rx.Observable.combineLatest(addedFeed$, article$);
  return ComponentStream(rssFeedContainer, newArticle$);
}

function RenderArticleObserver(article$, rootNode) {
  return article$
    .do(() => console.info('Rendering'))
    .subscribe(appendFeeds.bind(null, rootNode));
}

function appendFeeds(feed, articles) {
  articles.map(Article).forEach(article => feed.appendChild(article));
}

function Article(rssItem) {
  return DomNode(`
    <li>
      <a href="${rssItem.link._text}">${rssItem.title._text}</a>
      <article>${(rssItem['content:encoded'] || rssItem.description)._cdata}</article>
    </li>
  `);
}

