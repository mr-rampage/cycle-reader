import 'whatwg-fetch';
import Rx from 'rxjs/Rx';
import { xml2js } from 'xml-js';
import { RssFeedRepository } from './rss-feed.repository';

const feedRepository = RssFeedRepository('feeds', 'uri');
const XML2JS_CONFIG = {compact: true, ignoreAttributes: true, ignoreDeclaration: true, ignoreDoctype: true};

export const RssFeedService = {
  fetch$: Fetch$
};

function Fetch$(feedUri$) {
  const feed$ = feedUri$.flatMap(feedUri => Rx.Observable.fromPromise(requestFeed(feedUri)))
    .filter(response => response.ok);

  HotPersist$(feed$);

  return feed$.pluck('data')
    .map(xml => xml2js(xml, XML2JS_CONFIG));
}

function requestFeed(feedUri) {
  const headers = new Headers();
  headers.set('Accept', 'application/rss+xml');
  const requestOptions = { mode: 'cors', method: 'GET', headers: headers };
  return fetch(proxy(feedUri), requestOptions)
    .then(response => response.text().then(xml => ({'ok': response.ok, 'uri': feedUri, 'data': xml})));
}

function proxy(feedUri) {
  return `http://crossorigin.me/${feedUri}`
}

function HotPersist$(feed$) {
  return feed$.flatMap(({uri}) => feedRepository.Insert$({uri})).publish().connect();
}
