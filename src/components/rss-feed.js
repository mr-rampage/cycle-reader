import { ComponentStream } from './component-stream';
import { DomNode } from './dom-node';

export function RssFeed(feed$) {
  const rssFeedContainer = DomNode('<ul></ul>');

  const newFeed$ = feed$.filter(response => response);

  newFeed$.filter(response => response)
    .pluck('query', 'results', 'item')
    .do(console.info)
    .subscribe(showFeeds.bind(null, removeChildren(rssFeedContainer)));

  return ComponentStream(rssFeedContainer, newFeed$.pluck('query', 'count'));
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
