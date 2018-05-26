import xs from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'
import { $put } from 'cycle-idb'
import { ARTICLE_DB, FEED_DB } from '../index'

export function storeFeed (sources) {
  const actions = intent(sources)

  return {
    IDB: actions.persist$
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

function filterNewArticles (dbSource, article$) {
  return article$
    .filter(hasArticles)
    .compose(sampleCombine(dbSource.store(ARTICLE_DB).getAllKeys()))
    .map(selectNewArticles)
}

function persistArticles (feed$, article$) {
  return article$
    .compose(sampleCombine(feed$))
    .map(saveFeed)
    .map(xs.fromArray)
    .flatten()
}

function hasArticles (articles) {
  return articles && articles.length
}

function selectNewArticles ([articles, existing]) {
  return articles.filter(article => existing.indexOf(article.link) > 0)
}

function saveFeed ([articles, feedUri]) {
  return articles.map(article => $put(ARTICLE_DB, article))
    .concat($put(FEED_DB, feedUri))
}
