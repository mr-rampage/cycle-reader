import { ArticleModal } from './article'
import * as UIkit from 'uikit'

export function ArticleViewer (sources) {
  const actions = intent(sources.onion.state$, sources.FETCH)
  const vdom$ = view(actions.showArticle$)

  actions.showArticle$.drop(1)
    .debug()
    .addListener({
      next: () => UIkit.modal('[uk-modal]').show()
    })

  return {
    DOM: vdom$,
    FETCH: actions.fetchArticle$
  }
}

function intent (stateSource, fetchSource) {
  const fetchArticle$ = stateSource
    .filter(uri => uri)
    .map(uri => ({uri, category: 'article'}))

  const showArticle$ = fetchSource.select('article')
    .flatten()
    .startWith('')

  return {
    fetchArticle$,
    showArticle$
  }
}

function view (articleSource) {
  return articleSource.map(ArticleModal)
}
