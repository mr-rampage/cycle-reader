import { unmarshal } from '../domain/rss-to-json'
import { byCategory } from '../domain/response-filter'

export function Rss ({FETCH, props}) {
  const request$ = props.url$
    .filter(url => url)
    .map(url => ({url, category: props.category}))

  const feed$ = FETCH
    .filter(byCategory.bind(null, props.category))

  const articles$ = feed$
    .map(unmarshal)
    .flatten()

  return {
    FETCH: request$,
    articles: articles$,
    feed: feed$
  }
}
