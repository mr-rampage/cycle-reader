import { xml2js } from 'xml-js'

const XML2JS_CONFIG = {compact: true, ignoreAttributes: true, ignoreDeclaration: true, ignoreDoctype: true}

export function RssList ({HTTP, props}) {
  const proxyUrl = 'http://cors-proxy.htmldriven.com/?url='

  const request$ = props.url$.map(url => ({
    url: proxyUrl + url,
    method: 'GET',
    category: 'rss'
  }))

  const response$ = HTTP
    .select('rss')
    .flatten()

  const vdom$ = response$
    .map(({text}) => JSON.parse(text))
    .map(response => xml2js(response.body, XML2JS_CONFIG))
    .map(response => (
      <pre>{JSON.stringify(response, null, 2)}</pre>
    ))

  return {
    DOM: vdom$,
    HTTP: request$
  }
}
