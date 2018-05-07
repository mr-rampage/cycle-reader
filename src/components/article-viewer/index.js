import * as UIkit from 'uikit'
import { ArticleModal } from './article'
import { FetchClient } from '../fetch-client'

export function ArticleViewer (sources) {
  const articleSource = FetchClient('article')(sources)

  const actions = intent(articleSource.response)
  const vdom$ = view(actions.showArticle$)

  actions.showArticle$.drop(1)
    .addListener({
      next: () => UIkit.modal('[uk-modal]').show()
    })

  return {
    DOM: vdom$,
    FETCH: articleSource.FETCH
  }
}

function intent (articleSource) {
  const showArticle$ = articleSource
    .startWith('')

  return {
    showArticle$
  }
}

function view (articleSource) {
  return articleSource.map(ArticleModal)
}
