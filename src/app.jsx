import { UrlInput } from './components/url-input/index'
import xs from 'xstream'
import { RssList } from './components/rss-list/index'
import { proxied } from './domain/proxy-request'
import { xmlResponseAdapter } from './domain/xml-json.adapter'
import { feed } from './domain/feed'

export function main (sources) {
  const urlSource = url$(sources)
  const rssSink = rss$(sources, urlSource.value)

  const vDom$ = xs.combine(urlSource.DOM, rssSink.DOM)
    .map(([urlInput, rssList]) =>
      <div>
        {urlInput}
        {rssList}
      </div>
    )

  return {
    DOM: vDom$,
    HTTP: rssSink.HTTP
  }
}

function url$ (sources) {
  return UrlInput(sources)
}

function rss$ (source$, url$) {
  const rssSources = (sources$, url$) => ({
    ...sources$,
    props: {
      url$: url$
        .filter(url => url)
        .map(proxied)
    }
  })

  return RssList(rssSources(source$, url$), (response) => feed(xmlResponseAdapter(response)))
}
