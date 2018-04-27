import { RssSearch } from './components/rss-search'
import xs from 'xstream'
import { RssList } from './components/rss-list'
import { Rss } from './components/rss'
import { Article } from './components/article'
import { proxied } from './domain/proxy-request'
import { FEED_IDB } from './index'
import { $put } from 'cycle-idb'
import { Articles$ } from './domain/articles'

export function main (sources) {
  const searchSource = RssSearch(sources)
  const feedSource = Rss({...sources, props: {url$: searchSource.value, category: 'rss'}})

  const article$ = Articles$({...sources, props: {feed$: feedSource.value}}, FEED_IDB)
  const list = RssList({...sources, props: {feed$: article$}})
  const articleModal = Article({...sources, props: {article$: list.value, category: 'article'}})

  const fetchRequests$ = proxyFetchRequests(feedSource.FETCH, articleModal.FETCH)
  const storeRequests$ = storeArticles(article$)
  const domUpdates$ = render(searchSource.DOM, list.DOM, articleModal.DOM)

  return {
    DOM: domUpdates$,
    FETCH: fetchRequests$,
    IDB: storeRequests$
  }
}

function proxyFetchRequests (...fetches) {
  return xs.merge.apply(null, fetches)
    .map(request => ({...request, url: proxied(request.url), options: {mode: 'cors'}}))
}

function render (...vtrees) {
  return xs.combine.apply(null, vtrees)
    .map(vdoms =>
      <div>
        {vdoms}
      </div>
    )
}

function storeArticles (article$) {
  return article$
    .drop(1)
    .map(articles => xs.fromArray(articles))
    .flatten()
    .map(article => $put(FEED_IDB, article))
}
