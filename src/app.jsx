import { RssSearch } from './components/rss-search'
import xs from 'xstream'
import { RssList } from './components/rss-list'
import { Rss } from './components/rss'

export function main (sources) {
  const searchSource = RssSearch(sources.DOM)
  const feedSource = Rss({HTTP: sources.HTTP, props: {url$: searchSource.value, category: 'rss'}})
  const list = RssList({props: {feed$: feedSource.value}})

  const vdom$ = xs.combine(searchSource.DOM, list.DOM)
    .map(([rssSearch, rssList]) =>
      <div>
        {rssSearch}
        {rssList}
      </div>
    )

  return {
    DOM: vdom$,
    HTTP: feedSource.HTTP
  }
}
