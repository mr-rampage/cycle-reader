import { UrlInput } from './components/url-input/index'
import xs from 'xstream'
import { RssList } from './components/rss-list'
import { proxied } from './domain/proxy-request'
import { xmlResponseAdapter } from './domain/xml-json.adapter'
import { feed } from './domain/feed'

function old (sources) {
  const intent = sources$ => UrlInput(sources$)
  const model = intent$ => intent$
  const view = model$ => xs.combine(model$.DOM, model$.value)
    .map(([dom, url]) =>
      <div>
        {dom}
        <p>{url}</p>
      </div>
    )

  return {
    DOM: view(model(intent(sources)))
  }
}

export function main (sources) {
  const rssSources = sources$ => ({...sources$, props: {url$: xs.of(proxied('http://kotaku.com/rss'))}})

  const intent = sources$ => RssList(rssSources(sources$), (response) => feed(xmlResponseAdapter(response)))
  const model = intent$ => intent$
  const view = model$ => model$.DOM
    .map(vdom => (
      <div>
        {vdom}
      </div>
    ))

  const rssList$ = model(intent(sources))
  return {
    DOM: view(rssList$),
    HTTP: rssList$.HTTP
  }
}
