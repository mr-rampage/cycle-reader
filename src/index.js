import './service-workers/cache.service-worker';
import './assets/styles/styles.scss';
import { RssList } from './components/rss-list';

require('html-loader!./templates/index.html');

const list = RssList();
document.body.appendChild(list.component);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/cache.service-worker.js');
}
