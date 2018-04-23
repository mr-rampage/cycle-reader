import { ArticleModal } from './article'
import * as UIkit from 'uikit'

export function Article ({HTTP, props}) {
  const request$ = props.article$
    .map(url => ({url, category: props.category}))

  const response$ = HTTP.select(props.category).flatten()
    .map(response => response.body)
    .filter(body => body.success)
    .startWith('')

  const vdom$ = response$
    .map(ArticleModal)

  const modalListener = response$
    .drop(1)
    .addListener({next: () => UIkit.modal('[uk-modal]').show()})

  return {
    DOM: vdom$,
    HTTP: request$,
    modal: modalListener
  }
}
