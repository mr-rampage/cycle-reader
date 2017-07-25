import { ComponentStream } from './component-stream';
import { DomNode } from './dom-node';
import { RssFeedService } from './rss-feed.service';
import Rx from 'rxjs';

export function RssFeed(addedFeed$) {
  const rssFeedContainer = DomNode('<ul></ul>');

  const article$ = addedFeed$.flatMap(RssFeedService.fetch)
    .filter(feed => !!feed.rss.channel.item);

  const newArticle$ = Rx.Observable.combineLatest(addedFeed$, article$);
  RenderArticleObserver(newArticle$, rssFeedContainer);

  return ComponentStream(rssFeedContainer, ArticleCount$(newArticle$));
}

function RenderArticleObserver(newArticle$, node) {
  return newArticle$.map(([, articles]) => articles)
    .pluck('rss', 'channel', 'item')
    .subscribe(showFeeds.bind(null, removeChildren(node)));
}

function ArticleCount$(newArticle$) {
  return newArticle$.map(([, articles]) => articles)
    .pluck('query', 'count');
}

function showFeeds(feed, articles) {
  articles.map(Article).forEach(item => feed.appendChild(item));
}

function Article(rssItem) {
  return DomNode(`
    <li>
      <a href="${rssItem.link._text}">${rssItem.title._text}</a>
      <article>${rssItem.description._cdata}</article>
    </li>
  `);
}

function removeChildren(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
  return node;
}

