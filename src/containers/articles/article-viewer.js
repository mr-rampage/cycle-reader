import * as UIkit from 'uikit'
import { ArticleModal } from '../../components/article-modal'

export function ArticleViewer (sources) {
  const vdom$ = view(sources.onion.state$)

  sources.onion.state$.drop(1)
    .addListener({
      next: () => UIkit.modal('[uk-modal]').show()
    })

  return {
    DOM: vdom$
  }
}

function view (articleSource) {
  return articleSource
    .map(ArticleModal)
    .startWith('')
}
