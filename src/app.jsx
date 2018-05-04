import { RssSearch } from './components/rss-search'
import xs from 'xstream'
import debounce from 'xstream/extra/debounce'
import isolate from '@cycle/isolate'
import { RssList } from './components/rss-list'
import { Rss } from './providers/rss-provider'
import { proxied } from './domain/proxy-request'
import { ARTICLE_DB, FEED_DB } from './index'
import { saveArticles } from './providers/article-repository'
import { subscribeFeed } from './providers/feed-repository'
import { periodicRefresh } from './providers/periodic-refresh'

export function main (sources) {
  const search = isolate(RssSearch, 'feed')(sources)
  const feedList = RssList(sources)

  const rss = Rss(sources)
  const feedCache = isolate(subscribeFeed, 'feed')(sources)

  const articlesCache = saveArticles({...sources, props: {articles: rss.articles, db: ARTICLE_DB}})
  const feedRefresh = periodicRefresh({...sources, props: {category: 'rss', db: FEED_DB}})

  return {
    DOM: render(search.DOM, feedList.DOM),
    FETCH: proxy(rss.FETCH, feedList.FETCH, feedRefresh.FETCH),
    IDB: xs.merge(articlesCache.IDB, feedCache.IDB),
    onion: xs.merge(initialReducer$(sources), search.onion)
  }
}

function proxy (...fetches) {
  return xs.merge.apply(null, fetches)
    .map(request => ({...request, url: proxied(request.url), href: request.url, options: {mode: 'cors'}}))
}

function render (...vtrees) {
  return xs.combine.apply(null, vtrees)
    .compose(debounce(100))
    .map(vdoms =>
      <div>
        {vdoms}
      </div>
    )
}

function initialReducer$ (sources) {
  return xs.of(() => ({
    feed: {
      url: '',
      db: FEED_DB,
      category: 'rss'
    },
    articles: sources.IDB.store(ARTICLE_DB).getAll()
  }))
}
