import 'whatwg-fetch';
import Rx from 'rxjs/Rx';
import { xml2js } from 'xml-js';
import { RssFeedRepository } from './rss-feed.repository';

const feedRepository = RssFeedRepository('feeds', 'uri');
const XML2JS_CONFIG = {compact: true, ignoreAttributes: true, ignoreDeclaration: true, ignoreDoctype: true};
const proxyHost = 'https://crossorigin.me/'; //'http://cors-proxy.htmldriven.com/?url=';

export const RssFeedService = {
  fetch$: Fetch$
};

function Fetch$(feedUri$) {
  const feed$ = feedUri$
    .flatMap(feedUri => Rx.Observable.fromPromise(requestFeed(feedUri)))
    .filter(response => response.ok).share();

  HotPersist$(feed$);

  return RssJsonFeed$(feed$);
}

function requestFeed(feedUri) {
  const requestOptions = { mode: 'cors', method: 'GET' };
  return fetch(proxy(feedUri), requestOptions)
    .then(response => response.text().then(xml => ({'ok': response.ok, 'uri': feedUri, 'data': xml})));
}

function proxy(feedUri) {
  return `${proxyHost}${feedUri}`
}

function HotPersist$(feed$) {
  return feed$.flatMap(({uri}) => feedRepository.Insert$({uri})).publish().connect();
}

function RssJsonFeed$(feed$) {
  return feed$.pluck('data')
    .map(xml => xml2js(xml, XML2JS_CONFIG))
    .filter(feed => !!feed.rss.channel.item)
    .pluck('rss', 'channel', 'item');
}
