import { UrlInput } from './components/url-input/index'
import xs from 'xstream'
import { RssList } from './components/rss-list'

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
  const intent = sources$ => RssList({...sources$, props: {url$: xs.of('http://kotaku.com/rss')}})
  const model = intent$ => intent$
  const view = model$ => model$.DOM
    .map(vdom => (
      <div>
        <label>Response</label>
        {vdom}
      </div>
    ))

  const rssList$ = model(intent(sources))
  return {
    DOM: view(rssList$),
    HTTP: rssList$.HTTP
  }
}
