import { Article } from './article'

export function RssList ({HTTP, props}, feedAdapter = x => x) {
  const request$ = props.url$.map(url => ({
    url: url,
    method: 'GET',
    category: 'rss'
  }))

  const response$ = HTTP
    .select('rss')
    .flatten()
    .map(feedAdapter)

  const vdom$ = response$
    .map(feed =>
      <div className="uk-child-width-1-2@m">{feed.map(Article)}</div>
    )

  return {
    DOM: vdom$,
    HTTP: request$
  }
}
