import { unmarshal } from '../domain/rss-to-json'
import { byCategory } from '../domain/response-filter'

export function Rss ({WORKER, props}) {
  const request$ = props.url$
    .filter(url => url)
    .map(url => ({url, category: props.category}))

  const response$ = WORKER
    .filter(byCategory.bind(null, props.category))
    .map(unmarshal)
    .flatten()

  return {
    FETCH: request$,
    articles: response$
  }
}
