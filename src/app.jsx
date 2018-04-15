import { UrlInput } from './components/url-input/index'
import xs from 'xstream'
import { RssList } from './components/rss-list/index'
import { proxied } from './domain/proxy-request'
import { xmlResponseAdapter } from './domain/xml-json.adapter'
import { feed } from './domain/feed'

export function main (sources) {
  const intent = sources$ => UrlInput(sources$)
  const model = intent$ => intent$
  const urlInput = model(intent(sources))

  const rssSources = (sources$, url$) => ({
    ...sources$,
    props: {
      url$: url$
        .filter(url => url)
        .map(proxied)
    }
  })
  const rssList = RssList(rssSources(sources, urlInput.value), (response) => feed(xmlResponseAdapter(response)))

  const view = model$ => xs.combine(model$.DOM, rssList.DOM)
    .map(([urlInput, rssList]) =>
      <div>
        {urlInput}
        {rssList}
      </div>
    )

  return {
    DOM: view(urlInput),
    HTTP: rssList.HTTP
  }
}
