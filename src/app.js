import { UrlInput } from './components/url-input';

export function main (sources) {
  const urlInput = UrlInput(sources)

  return {
    DOM: urlInput.DOM.map(vdom =>
      vdom
    )
  }
}
