import {RssUri} from './components/rss-uri'
import './assets/styles/styles.scss';
import HelloWorld from './assets/js/hello-world';

require('html-loader!./templates/index.html');

let indexPage = new HelloWorld('Hello from index page!');

const rssUri = RssUri();

document.body.appendChild(rssUri.component);
rssUri.stream.subscribe(x => console.log('I got a feed', x));
