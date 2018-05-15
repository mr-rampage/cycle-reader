import xs from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'
import { ProxyRequest } from './domain/proxy-request'
import FetchService from './services'
import Stores from './stores'
import UI from './containers'

export function main (sources) {
  const ui = UI(sources)
  const requests = FetchService(sources)
  const indexedDb = Stores(sources)

  return {
    DOM: ui.DOM,
    FETCH: requests.FETCH.compose(proxyRequests(sources.onion.state$)),
    IDB: indexedDb.IDB,
    onion: xs.merge(ui.onion, requests.onion, indexedDb.onion)
  }
}

function proxyRequests (stateSource) {
  return function proxy (request$) {
    return request$
      .compose(sampleCombine(stateSource.map(({settings}) => settings)))
      .map(ProxyRequest)
  }
}
