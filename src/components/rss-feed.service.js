import 'whatwg-fetch';
import Rx from 'rxjs/Rx';


const EXTERNAL_REQUEST = { mode: 'cors', method: 'GET'};

export const RssFeedService = {
  fetch: feedUri => Rx.Observable.fromPromise(requestFeed(feedUri))
}

function toYql(feedUri) {
  return `https://query.yahooapis.com/v1/public/yql?q=select * from rss where url='${feedUri}'&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys&callback=`
}

function requestFeed(feedUri) {
  return fetch(toYql(feedUri), EXTERNAL_REQUEST).then(response => response.json());
}