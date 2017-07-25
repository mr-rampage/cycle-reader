import 'whatwg-fetch';
import Rx from 'rxjs/Rx';
import { xml2js } from 'xml-js';

//const feedRepository = RssFeedRepository('feeds', 'uri');
// feedRepository.Insert$(AddedFeed$(newArticle$)).subscribe(console.info);
const EXTERNAL_REQUEST = { mode: 'cors', method: 'GET'};

export const RssFeedService = {
  fetch: feedUri => Rx.Observable.fromPromise(requestFeed(feedUri))
};

function proxy(feedUri) {
  return `http://crossorigin.me/${feedUri}`
}

function requestFeed(feedUri) {
  return fetch(proxy(feedUri), EXTERNAL_REQUEST)
    .then(response => xml2js(response.text(), {compact: true}));
}

//function AddedFeed$(newArticle$) {
//  return newArticle$.map(([uri]) => ({'uri': uri}));
//}

