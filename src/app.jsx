import { RssSearch } from './components/rss-search'
import xs from 'xstream'
import { RssList } from './components/rss-list'
import { Rss } from './components/rss'
import { ArticleViewer } from './components/article-viewer'
import { proxied } from './domain/proxy-request'
import { FEED_IDB } from './index'
import { $put } from 'cycle-idb'

export function main (sources) {
  countArticles(sources, FEED_IDB)
  const search = RssSearch(sources)
  const fetchFeed = Rss({...sources, props: {url$: search.query, category: 'rss'}})
  const feedList = RssList({...sources, props: {feed$: sources.IDB.store(FEED_IDB).getAll()}})
  const articleViewer = ArticleViewer({...sources, props: {article$: feedList.selected, category: 'article'}})

  return {
    DOM: render(search.DOM, feedList.DOM, articleViewer.DOM),
    FETCH: proxyFetchRequests(fetchFeed.FETCH, articleViewer.FETCH),
    IDB: storeArticles(fetchFeed.articles)
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

function storeArticles (newArticles$) {
  return newArticles$
    .map(articles => xs.fromArray(articles))
    .flatten()
    .map(article => $put(FEED_IDB, article))
}

/* we need to subscribe to the store since it is lazy */
function countArticles (sources, storeName) {
  return sources.IDB.store(storeName).count().addListener({
    next: count => console.info('Article count:', count)
  })
}
