import { proxied } from './proxy-request'
import { feed } from './feed'
import { xmlResponseAdapter } from './xml-json.adapter'

export function Rss ({HTTP, props}, category) {
  const request$ = props.url$
    .filter(url => url)
    .map(proxied)
    .map(url => ({url, category}))

  const response$ = HTTP.select(category).flatten()
    .map(response => feed(xmlResponseAdapter(response)))

  return {
    HTTP: request$,
    value: response$
  }
}
