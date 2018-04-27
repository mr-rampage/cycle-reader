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

  const article$ = Articles$(sources.IDB.store(FEED_IDB).getAll().take(1), feedSource.value)
  const list = RssList({...sources, props: {feed$: article$}})
  const articleModal = Article({...sources, props: {article$: list.value, category: 'article'}})

  const fetch$ = xs.merge(feedSource.FETCH, articleModal.FETCH)
    .map(request => ({...request, url: proxied(request.url), options: {mode: 'cors'}}))

  const vdom$ = xs.combine(searchSource.DOM, list.DOM, articleModal.DOM)
    .map(([rssSearch, rssList, article]) =>
      <div>
        {rssSearch}
        {rssList}
        {article}
      </div>
    )

  const indexedDB$ = article$
    .drop(1)
    .map(articles => xs.fromArray(articles))
    .flatten()
    .map(article => $put(FEED_IDB, article))

  return {
    DOM: vdom$,
    FETCH: fetch$,
    IDB: indexedDB$
  }
}
