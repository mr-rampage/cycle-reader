import { RssSearch } from './components/rss-search'
import xs from 'xstream'
import isolate from '@cycle/isolate'
import { RssList } from './components/rss-list'
import { Rss } from './providers/rss-provider'
import { ArticleViewer } from './components/article-viewer'
import { proxied } from './domain/proxy-request'
import { ARTICLE_DB, FEED_DB } from './index'
import { saveArticles } from './providers/article-repository'
import { subscribeFeed } from './providers/feed-repository'
import { periodicRefresh } from './providers/periodic-refresh'

export function main (sources) {
  sources.onion.state$.addListener({next: console.info})

  const search = isolate(RssSearch, 'feed')(sources)
  const rss = Rss(sources)

  const feedList = RssList({...sources, props: {feed$: sources.IDB.store(ARTICLE_DB).getAll()}})
  const article = ArticleViewer({...sources, props: {article$: feedList.selected, category: 'article'}})

  const articlesCache = saveArticles({...sources, props: {articles: rss.articles, db: ARTICLE_DB}})
  const feedCache = isolate(subscribeFeed, 'feed')(sources)
  const feedRefresh = periodicRefresh({...sources, props: {category: 'rss', db: FEED_DB}})

  return {
    DOM: render(search.DOM, feedList.DOM, article.DOM),
    FETCH: proxy(rss.FETCH, article.FETCH, feedRefresh.FETCH),
    IDB: xs.merge(articlesCache.IDB, feedCache.IDB),
    onion: xs.merge(initialReducer$(sources), search.onion, rss.onion)
  }
}

function proxy (...fetches) {
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

function initialReducer$ () {
  return xs.of(() => ({
    feed: {
      url: '',
      db: FEED_DB,
      category: 'rss'
    },
    articles: {
      fetched: [],
      db: ARTICLE_DB,
      category: 'article'
    }
  }))
}
