import { unmarshal } from '../../domain/rss-to-json'

export function Rss ({FETCH, props}) {
  const request$ = props.url$
    .filter(url => url)
    .map(url => ({url, category: props.category}))

  const response$ = FETCH.select(props.category)
    .flatten()
    .map(unmarshal)
    .flatten()

  return {
    FETCH: request$,
    articles: response$
  }
}
