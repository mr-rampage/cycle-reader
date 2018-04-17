import { proxied } from './proxy-request'
import { feed } from './feed'
import { xmlResponseAdapter } from './xml-json.adapter'

export function Rss (sources, category) {
  const request$ = sources.props.url$
    .filter(url => url)
    .map(proxied)
    .map(url => ({url, category}))

  const response$ = sources.HTTP.select(category).flatten()
    .map(response => feed(xmlResponseAdapter(response)))

  return {
    HTTP: request$,
    value: response$
  }
}
