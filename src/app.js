import xs from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'
import { ProxyRequest } from './domain/proxy-request'
import FetchService from './services'
import Stores from './stores'
import Router from './router'

export function main (sources) {
  const appRouter = Router(sources)
  const requests = FetchService(sources)
  const indexedDb = Stores(sources)

  return {
    DOM: appRouter.DOM,
    FETCH: xs.merge(appRouter.FETCH, requests.FETCH).compose(proxyRequests(sources.onion.state$)),
    IDB: xs.merge(appRouter.IDB, indexedDb.IDB),
    onion: xs.merge(appRouter.onion, requests.onion, indexedDb.onion),
    router: appRouter.router
  }
}

function proxyRequests (stateSource) {
  return function proxy (request$) {
    return request$
      .compose(sampleCombine(stateSource.map(({settings}) => settings)))
      .map(ProxyRequest)
  }
}
