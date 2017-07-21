import './assets/styles/styles.scss';
import HelloWorld from './assets/js/hello-world';
import { RssList } from './components/rss-list';

require('html-loader!./templates/index.html');

new HelloWorld('Hello from index page!');

const list = RssList();

document.body.appendChild(list.component);
list.stream.subscribe(x => console.log('I got a feed', x));
