import xs from 'xstream'
import { Feed } from './feed'
import { ArticleViewer } from '../article-viewer'

export function RssList ({props, ...sources}) {
  const viewArticle$ = sources.DOM.select('.uk-card').events('click')
    .map(event => event.currentTarget)
    .map(target => target.attributes.getNamedItem('href').value)

  const article = ArticleViewer({...sources, props: {article$: viewArticle$, category: 'article'}})

  const vdom$ = props.feed$
    .filter(feed => feed.length)
    .map(Feed)
    .startWith('')

  return {
    DOM: xs.combine(vdom$, article.DOM),
    FETCH: article.FETCH,
    selected: viewArticle$
  }
}
