import { UrlInput } from './components/url-input/index'
import xs from 'xstream'

export function main (sources) {
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
