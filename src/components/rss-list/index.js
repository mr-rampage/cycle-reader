import { Feed } from './feed'

export function RssList ({DOM, props}) {
  const viewArticle$ = DOM.select('.uk-card').events('click')
    .map(event => event.currentTarget)
    .map(target => target.attributes.getNamedItem('href').value)

  const vdom$ = props.feed$
    .filter(feed => feed.length)
    .map(Feed)
    .startWith('')

  return {
    DOM: vdom$,
    value: viewArticle$
  }
}
