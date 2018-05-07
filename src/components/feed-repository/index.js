import xs from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'
import { $put } from 'cycle-idb'

export function FeedRepository (sources) {
  const actions = intent(sources.onion.state$, sources.props)

  return {
    IDB: actions.persist$
  }
}

function intent (stateSource, propSource) {
  const articleSource = stateSource.map(({articles}) => articles)
  const feedSource = stateSource.map(({uri}) => uri)

  const persist$ = articleSource
    .filter(articles => articles.length)
    .compose(sampleCombine(feedSource))
    .map(([articles, feed]) => [
      articles.map(article => $put(propSource.articlesDb, article)),
      $put(propSource.feedDb, feed)
    ])
    .map(([articlePuts, feedPuts]) => articlePuts.concat(feedPuts))
    .map(xs.fromArray)
    .flatten()

  return {
    persist$
  }
}
