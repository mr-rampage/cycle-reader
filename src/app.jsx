import xs from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'
import isolate from '@cycle/isolate'
import AddFeed from './containers/add-feed'
import ArticleList from './containers/article-list'
import Settings from './containers/settings'
import { ProxyRequest } from './domain/proxy-request'
import FetchService from './services'
import Stores from './stores'

export function main (sources) {
  const addFeed = isolate(AddFeed, 'new-feed')(sources)
  const articleList = isolate(ArticleList, 'feed-list')(sources)
  const settings = isolate(Settings, 'settings')(sources)

  const requests = FetchService(sources)
  const indexedDb = Stores(sources)

  sources.onion.state$.addListener({next: console.info})

  return {
    DOM: view(addFeed.DOM, articleList.DOM, settings.DOM),
    FETCH: requests.FETCH.compose(proxyRequests(sources.onion.state$)),
    IDB: indexedDb.IDB,
    onion: xs.merge(addFeed.onion, articleList.onion, requests.onion, settings.onion, indexedDb.onion)
  }
}

function proxyRequests (stateSource) {
  return function proxy (request$) {
    return request$
      .compose(sampleCombine(stateSource.map(({settings}) => settings)))
      .map(ProxyRequest)
  }
}

function view (...vtree) {
  return xs.combine.apply(null, vtree)
    .map(([addFeed, list, settings]) =>
      <div>
        <div className='uk-flex uk-flex-middle uk-padding-small uk-padding-remove-top uk-padding-remove-bottom'>
          {addFeed}
        </div>
        {settings}
        {list}
      </div>
    )
}
