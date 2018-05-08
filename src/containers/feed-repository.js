import xs from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'
import { $put } from 'cycle-idb'

export function FeedRepository (sources) {
  const newFeed$ = sources.onion.state$.map(state => state['new-feed'])
  const actions = intent(newFeed$, sources.props)
  const reducer$ = model(sources.IDB.store(sources.props.articlesDb))

  return {
    IDB: actions.persist$,
    onion: reducer$
  }
}

function intent (stateSource, propSource) {
  const articleSource = stateSource.map(({articles}) => articles)
  const feedSource = stateSource.map(({uri}) => uri)

  const persist$ = articleSource
    .filter(articles => articles.length)
    .compose(sampleCombine(feedSource))
    .map(([articles, href]) => [
      articles.map(article => $put(propSource.articlesDb, article)),
      $put(propSource.feedDb, {href})
    ])
    .map(([articlePuts, feedPuts]) => articlePuts.concat(feedPuts))
    .map(xs.fromArray)
    .flatten()

  return {
    persist$
  }
}

function model (actions) {
  const feedListReducer$ = actions.getAll()
    .map(articles => prevState => ({...prevState, 'feed-list': { viewing: '', articles }}))

  return feedListReducer$
}
