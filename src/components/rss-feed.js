import { ComponentStream } from './component-stream';
import { DomNode } from './dom-node';
import { RssFeedService } from './rss-feed.service';
import { RssFeedRepository } from './rss-feed.repository';
import Rx from 'rxjs';

const feedRepository = RssFeedRepository('feeds', 'uri');

export function RssFeed(newFeed$) {
  const rssFeedContainer = DomNode('<ul></ul>');

  const article$ = newFeed$.flatMap(RssFeedService.fetch)
    .filter(feed => !!feed.query.results.item);

  const newArticle$ = Rx.Observable.combineLatest(newFeed$, article$);
  RenderArticleObserver(newArticle$, rssFeedContainer);
  feedRepository.Insert$(AddedFeed$(newArticle$)).subscribe(console.info);

  return ComponentStream(rssFeedContainer, ArticleCount$(newArticle$));
}

function AddedFeed$(newArticle$) {
  return newArticle$.map(([uri]) => ({'uri': uri}));
}

function RenderArticleObserver(newArticle$, node) {
  return newArticle$.map(([, articles]) => articles)
    .pluck('query', 'results', 'item')
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
  return DomNode(`<li><h2><a href="${rssItem.link}">${rssItem.title}</a></h2><article>${rssItem.description}</article></li>`);
}

function removeChildren(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
  return node;
}

