import * as UIkit from 'uikit'
import { ArticleModal } from '../components/article-modal'

export function ArticleViewer (sources) {
  const actions = intent(sources.onion.state$)
  const vdom$ = view(actions.showArticle$)

  actions.showArticle$.drop(1)
    .addListener({
      next: () => UIkit.modal('[uk-modal]').show()
    })

  return {
    DOM: vdom$
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
