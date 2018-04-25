import { articles } from '../../domain/articles-adapter'
import { atomToJson } from '../../domain/atom-json'

export function Rss ({FETCH, props}) {
  const request$ = props.url$
    .filter(url => url)
    .map(url => ({url, category: props.category}))

  const response$ = FETCH.select(props.category)
    .flatten()
    .map(atomToJson)
    .flatten()
    .map(articles)

  return {
    FETCH: request$,
    value: response$
  }
}
