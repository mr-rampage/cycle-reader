import 'whatwg-fetch';
import Rx from 'rxjs/Rx';
import { xml2js } from 'xml-js';
import { RssFeedRepository } from './rss-feed.repository';

const feedRepository = RssFeedRepository('feeds', 'uri');

export const RssFeedService = {
  fetch$: Fetch$
};

function Fetch$(feedUri$) {
  feedRepository.Insert$(feedUri$.map(uri => ({ 'uri': uri }))).subscribe(console.info);

  return feedUri$.flatMap(feedUri => Rx.Observable.fromPromise(requestFeed(feedUri)))
    .map(xml => xml2js(xml, {compact: true, ignoreAttributes: true, ignoreDeclaration: true, ignoreDoctype: true}));
}

function requestFeed(feedUri) {
  const headers = new Headers();
  headers.set('Accept', 'application/rss+xml');
  const requestOptions = { mode: 'cors', method: 'GET', headers: headers };
  return fetch(proxy(feedUri), requestOptions).then(response => response.text());
}

function proxy(feedUri) {
  return `http://crossorigin.me/${feedUri}`
}
