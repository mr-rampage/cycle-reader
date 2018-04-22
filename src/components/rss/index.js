import { proxied } from './proxy-request'
import { articles } from './articles'
import { atomToJson } from './atom-json'

export function Rss ({HTTP, props}) {
  const request$ = props.url$
    .filter(url => url)
    .map(proxied)
    .map(url => ({url, category: props.category}))

  const response$ = HTTP.select(props.category).flatten()
    .map(atomToJson)
    .flatten()
    .map(articles)

  return {
    HTTP: request$,
    value: response$
  }
}
