import { RssSearch } from './components/rss-search'
import xs from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'
import { RssList } from './components/rss-list'
import { Rss } from './components/rss'
import { ArticleViewer } from './components/article-viewer'
import { proxied } from './domain/proxy-request'
import { ARTICLE_DB, FEED_DB } from './index'
import { $put } from 'cycle-idb'

export function main (sources) {
  countArticles(sources, ARTICLE_DB)
  const search = RssSearch(sources)
  const periodicSearch = sources.WORKER.map(xs.fromArray).flatten()
  const feedUrl = xs.merge(periodicSearch, search.query)

  const fetchFeed = Rss({...sources, props: {url$: feedUrl, category: 'rss'}})
  const feedList = RssList({...sources, props: {feed$: sources.IDB.store(ARTICLE_DB).getAll()}})
  const articleViewer = ArticleViewer({...sources, props: {article$: feedList.selected, category: 'article'}})

  const feedSubscriber = subscribeFeed(sources)
  const articleStore$ = storeArticles(sources.IDB.store(ARTICLE_DB), fetchFeed.articles)

  return {
    DOM: render(search.DOM, feedList.DOM, articleViewer.DOM),
    FETCH: proxyFetchRequests(fetchFeed.FETCH, articleViewer.FETCH),
    IDB: xs.merge(feedSubscriber.IDB, articleStore$),
    WORKER: sources.IDB.store(FEED_DB).getAllKeys()
  }
}

function subscribeFeed (sources) {
  const successfulFetch$ = sources.FETCH.select('rss')
    .map(request$ => request$.request.href)

  return {
    IDB: successfulFetch$.map(href => $put(FEED_DB, {href}))
  }
}

function proxyFetchRequests (...fetches) {
  return xs.merge.apply(null, fetches)
    .map(request => ({...request, url: proxied(request.url), href: request.url, options: {mode: 'cors'}}))
}

function render (...vtrees) {
  return xs.combine.apply(null, vtrees)
    .map(vdoms =>
      <div>
        {vdoms}
      </div>
    )
}

function storeArticles (store$, newArticles$) {
  return newArticles$
    .compose(sampleCombine(store$.getAllKeys()))
    .map(([articles, existing]) => articles.filter(article => existing.indexOf(article.link) < 0))
    .map(xs.fromArray)
    .flatten()
    .map(article => $put(ARTICLE_DB, article))
}

/* we need to subscribe to the store since it is lazy */
function countArticles (sources, storeName) {
  return sources.IDB.store(storeName).count().addListener({
    next: count => console.info('Article count:', count)
  })
}
