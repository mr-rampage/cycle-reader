import sampleCombine from 'xstream/extra/sampleCombine'
import { $put } from 'cycle-idb'
import xs from 'xstream'

export function saveArticles ({IDB, props}) {
  const request$ = props.articles
    .compose(sampleCombine(IDB.store(props.db).getAllKeys()))
    .map(([articles, existing]) => articles.filter(article => existing.indexOf(article.link) < 0))
    .map(xs.fromArray)
    .flatten()
    .map(article => $put(props.db, article))

  return {
    IDB: request$
  }
}
