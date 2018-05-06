import xs from 'xstream'
import { $put } from 'cycle-idb'

export function FeedRepository (sources) {
  const actions = intent(sources.onion.state$, sources.IDB, sources.props)
  const reducer$ = model(actions)

  const idb$ = actions.persist$.map(xs.fromArray).flatten()

  return {
    IDB: idb$,
    onion: reducer$
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

function model (actions) {
  return actions.persist$
    .map(() => prevState => ({...prevState, reset: true}))
}

function hasFetched (state) {
  return !!state.uri && !!state.articles && state.articles.length > 0 && state.reset === false
}
