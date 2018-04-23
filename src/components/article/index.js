import { ArticleModal } from './article'

export function Article ({HTTP, props}) {
  const request$ = props.article$
    .map(url => ({url, category: props.category}))

  const response$ = HTTP.select(props.category).flatten()

  const vdom$ = response$
    .map(response => response.body)
    .filter(body => body.success)
    .map(ArticleModal)
    .startWith('')

  return {
    DOM: vdom$,
    HTTP: request$
  }
}
