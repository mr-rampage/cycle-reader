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

  const newArticle$ = articleSource
    .filter(articles => articles.length)
    .compose(sampleCombine(sources.IDB.store(propSource.articlesDb).getAllKeys()))
    .map(([articles, existing]) => articles.filter(article => existing.indexOf(article.link) < 0))

  const persist$ = newArticle$
    .compose(sampleCombine(feedSource))
    .map(([articles, href]) => articles
      .map(article => $put(propSource.articlesDb, article))
      .concat($put(propSource.feedDb, {href}))
    )
    .map(xs.fromArray)
    .flatten()

  return {
    persist$
  }
}

function model (sources) {
  const defaultReducer$ = xs.of(prevState => prevState || {viewing: '', articles: []})
  const articlesReducer$ = sources.IDB.store(sources.props.articlesDb).getAll()
    .map(articles => prevState => ({...prevState, 'feed-list': {viewing: '', articles}}))

  return xs.merge(defaultReducer$, articlesReducer$)
}
