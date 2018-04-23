import { Feed } from './feed'
import { Articles$ } from '../../domain/articles'

export function RssList ({DOM, props}) {
  const viewArticle$ = DOM.select('.uk-card').events('click')
    .map(event => event.currentTarget)
    .map(target => target.attributes.getNamedItem('href').value)

  const model$ = Articles$(props.feed$)

  const vdom$ = model$
    .filter(feed => feed.length)
    .map(Feed)
    .startWith('')

  return {
    DOM: vdom$,
    value: viewArticle$
  }
}
