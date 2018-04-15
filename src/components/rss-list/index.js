import { Feed } from './feed'

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

  const vDom$ = response$.map(Feed)

  return {
    DOM: vDom$,
    HTTP: request$
  }
}
