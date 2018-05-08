import xs from 'xstream'
import isolate from '@cycle/isolate'
import sampleCombine from 'xstream/extra/sampleCombine'
import { $put } from 'cycle-idb'

export function FeedRepository (sources) {
  const actions = isolate(intent, 'new-feed')(sources)
  const reducer$ = model(sources)

  return {
    IDB: actions.persist$,
    onion: reducer$
  }
}

function intent (sources) {
  const stateSource = sources.onion.state$
  const propSource = sources.props

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

function model (sources) {
  return sources.IDB.store(sources.props.articlesDb).getAll()
    .map(articles => prevState => ({...prevState, 'feed-list': {viewing: '', articles}}))
}
