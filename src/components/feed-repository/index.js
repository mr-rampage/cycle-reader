import xs from 'xstream'
import { $put } from 'cycle-idb'

export function FeedRepository (sources) {
  const actions = intent(sources.onion.state$, sources.IDB, sources.props)
  const idb$ = actions.persist$.map(xs.fromArray).flatten()

  return {
    IDB: idb$
  }
}

function intent (stateSource, dbSource, propSource) {
  const persist$ = stateSource
    .filter(hasFetched)
    .map(({uri, articles}) => [$put(propSource.feedDb, {href: uri}), ...articles.map(article => $put(propSource.articlesDb, article))])

  return {
    persist$
  }
}

function hasFetched (state) {
  return !!state.uri && !!state.articles && state.articles.length > 0
}
