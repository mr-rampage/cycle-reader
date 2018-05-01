import { ArticleModal } from './article'
import * as UIkit from 'uikit'
import { byCategory } from '../../domain/response-filter'

export function ArticleViewer ({WORKER, props}) {
  const request$ = props.article$
    .map(url => ({url, category: props.category}))

  const response$ = WORKER
    .filter(body => body.success)
    .filter(byCategory.bind(null, props.category))
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
