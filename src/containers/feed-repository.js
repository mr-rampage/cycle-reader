import xs from 'xstream'
import isolate from '@cycle/isolate'
import sampleCombine from 'xstream/extra/sampleCombine'
import { $put } from 'cycle-idb'
import { ARTICLE_DB, FEED_DB } from '../index'

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

  const articleSource = stateSource.map(({articles}) => articles)
  const feedSource = stateSource.map(({uri}) => uri)

  const persist$ = articleSource
    .compose(filterNewArticles.bind(null, sources.IDB))
    .compose(persistArticles.bind(null, feedSource))

  return {
    persist$
  }
}

function model (sources) {
  const defaultReducer$ = xs.of(defaultReducer)
  const articlesReducer$ = sources.IDB.store(ARTICLE_DB).getAll()
    .map(articleReducer)

  return xs.merge(defaultReducer$, articlesReducer$)
}

function filterNewArticles (dbSource, article$) {
  return article$
    .filter(articles => articles && articles.length)
    .compose(sampleCombine(dbSource.store(ARTICLE_DB).getAllKeys()))
    .map(([articles, existing]) => articles.filter(article => existing.indexOf(article.link) < 0))
}

function persistArticles (feed$, article$) {
  return article$
    .compose(sampleCombine(feed$))
    .map(([articles, href]) => articles
      .map(article => $put(ARTICLE_DB, article))
      .concat($put(FEED_DB, {href}))
    )
    .map(xs.fromArray)
    .flatten()
}

function defaultReducer (prevState) {
  return prevState || {viewing: '', articles: []}
}

function articleReducer (articles) {
  return function (prevState) {
    return {...prevState, 'feed-list': {viewing: '', articles}}
  }
}
