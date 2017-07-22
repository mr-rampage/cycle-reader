import './assets/styles/styles.scss';
import { RssList } from './components/rss-list';

require('html-loader!./templates/index.html');

const list = RssList();
document.body.appendChild(list.component);
list.stream.subscribe(x => console.log('I got a feed', x));
