import { RssSearch } from './components/rss-search'
import xs from 'xstream'
import { RssList } from './components/rss-list'
import { Rss } from './components/rss'
import { Article } from './components/article'
import { proxied } from './domain/proxy-request'

export function main (sources) {
  const searchSource = RssSearch(sources.DOM)
  const feedSource = Rss({HTTP: sources.HTTP, props: {url$: searchSource.value, category: 'rss'}})
  const list = RssList({DOM: sources.DOM, props: {feed$: feedSource.value}})

  const articleModal = Article({HTTP: sources.HTTP, props: {article$: list.value, category: 'article'}})

  const http$ = xs.merge(feedSource.HTTP, articleModal.HTTP)
    .map(request => ({...request, url: proxied(request.url)}))

  const vdom$ = xs.combine(searchSource.DOM, list.DOM, articleModal.DOM)
    .map(([rssSearch, rssList, article]) =>
      <div>
        {rssSearch}
        {rssList}
        {article}
      </div>
    )

  return {
    DOM: vdom$,
    HTTP: http$
  }
}
