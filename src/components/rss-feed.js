import { ComponentStream } from './component-stream';
import { DomNode } from './dom-node';

export function RssFeed(feed$) {
  const rssFeedContainer = DomNode('<ul></ul>');

  feed$.pluck('query', 'results', 'item')
    .do(console.info)
    .subscribe(showFeeds.bind(null, removeChildren(rssFeedContainer)));

  const newArticle$ = feed$.pluck('query', 'count');

  return ComponentStream(rssFeedContainer, newArticle$);
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
