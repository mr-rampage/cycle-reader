import { RssSearch } from './components/rss-search'
import xs from 'xstream'
import { RssList } from './components/rss-list'
import { Rss } from './providers/rss'
import { ArticleViewer } from './components/article-viewer'
import { proxied } from './domain/proxy-request'
import { ARTICLE_DB, FEED_DB } from './index'
import { saveArticles } from './providers/article-repository'
import { subscribeFeed } from './providers/feed-repository'

export function main (sources) {
  const search = RssSearch(sources)
  const feed = Rss({...sources, props: {url$: search.query, category: 'rss'}})

  const feedList = RssList({...sources, props: {feed$: sources.IDB.store(ARTICLE_DB).getAll()}})
  const article = ArticleViewer({...sources, props: {article$: feedList.selected, category: 'article'}})

  const articlesCache = saveArticles({...sources, props: { articles: feed.articles, db: ARTICLE_DB }})
  const feedCache = subscribeFeed({...sources, props: { category: 'rss', db: FEED_DB }})

  return {
    DOM: render(search.DOM, feedList.DOM, article.DOM),
    WORKER: proxyFetchRequests(feed.FETCH, article.FETCH),
    IDB: xs.merge(articlesCache.IDB, feedCache.IDB)
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
