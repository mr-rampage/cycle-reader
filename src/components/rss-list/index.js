import xs from 'xstream'
import { Feed } from './feed'
import { ArticleViewer } from '../article-viewer'

export function RssList (sources) {
  const viewArticle$ = sources.DOM.select('.uk-card').events('click')
    .map(event => event.currentTarget)
    .map(target => target.attributes.getNamedItem('href').value)

  const article = ArticleViewer({...sources, props: {article$: viewArticle$, category: 'article'}})

  const model$ = sources.onion.state$
    .map(state => state.articles)
    .flatten()

  const vdom$ = state$ => state$
    .filter(feed => feed.length)
    .map(Feed)
    .startWith('')

  return {
    DOM: xs.combine(vdom$(model$), article.DOM),
    FETCH: article.FETCH
  }
}
