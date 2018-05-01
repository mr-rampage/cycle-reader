import { unmarshal } from '../../domain/rss-to-json'

export function Rss ({FETCH, WORKER, props}) {
  const request$ = props.url$
    .filter(url => url)
    .map(url => ({url, category: props.category}))

  const response$ = WORKER
    .map(unmarshal)
    .flatten()

  return {
    FETCH: request$,
    articles: response$
  }
}
