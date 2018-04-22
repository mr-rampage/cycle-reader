import { Feed } from './feed'
import { Articles$ } from '../../domain/articles'

export function RssList ({props}) {
  const model$ = Articles$(props.feed$)

  const vdom$ = model$
    .filter(feed => feed.length)
    .map(Feed)
    .startWith('')

  return {
    DOM: vdom$,
    value: model$
  }
}
