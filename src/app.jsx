import xs from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'
import isolate from '@cycle/isolate'
import AddFeed from './containers/add-feed'
import ArticleList from './containers/article-list'
import Settings from './containers/settings'
import { ProxyRequest } from './domain/proxy-request'
import { FeedRepository } from './containers/feed-repository'
import { FetchIndicator } from './containers/fetch-indicator'
import SettingsStore from './containers/settings-store'

export function main (sources) {
  const addFeed = isolate(AddFeed, 'new-feed')(sources)
  const spinner = FetchIndicator(sources)
  const articleList = isolate(ArticleList, 'feed-list')(sources)
  const settings = isolate(Settings, 'settings')(sources)

  const settingsStore = isolate(SettingsStore, 'settings')(sources)
  const persistFeed = FeedRepository(sources)

  sources.onion.state$.addListener({next: console.info})

  return {
    DOM: view(spinner.DOM, addFeed.DOM, articleList.DOM, settings.DOM),
    FETCH: spinner.FETCH.compose(proxyRequests(sources.onion.state$)),
    IDB: xs.merge(persistFeed.IDB, settingsStore.IDB),
    onion: xs.merge(addFeed.onion, articleList.onion, spinner.onion, persistFeed.onion, settings.onion, settingsStore.onion)
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
    .map(([spinner, addFeed, list, settings]) =>
      <div>
        <div className='uk-flex uk-flex-middle uk-padding-small uk-padding-remove-top uk-padding-remove-bottom'>
          {addFeed}{spinner}
        </div>
        {settings}
        {list}
      </div>
    )
}
