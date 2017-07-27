import './service-workers/cache.service-worker';
import './assets/styles/styles.scss';
import { RssList } from './components/rss-list';
import { RssFeed } from './components/rss-feed';

require('html-loader!./templates/index.html');

const list = RssList();
const feed = RssFeed(list.stream.filter(event => event.added).pluck('added'));
document.body.appendChild(list.component);
document.body.appendChild(feed.component);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/cache.service-worker.js');
}

