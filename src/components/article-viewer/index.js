import { ArticleModal } from './article'
import * as UIkit from 'uikit'

export function ArticleViewer ({FETCH, props}) {
  const request$ = props.article$
    .map(url => ({url, category: props.category}))

  const response$ = FETCH
    .select(props.category)
    .flatten()
    .startWith('')

  const vdom$ = response$
    .map(ArticleModal)

  const modalListener = response$
    .drop(1)
    .addListener({next: () => UIkit.modal('[uk-modal]').show()})

  return {
    DOM: vdom$,
    FETCH: request$,
    modal: modalListener
  }
}
