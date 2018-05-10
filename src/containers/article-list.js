import xs from 'xstream'
import isolate from '@cycle/isolate'
import { Feed } from '../components/feed'
import { ArticleViewer } from './article-viewer'

export default function ArticleList (sources) {
  const actions = intent(sources.DOM)
  const reducer$ = model(actions)

  const viewer$ = isolate(ArticleViewer, 'article')({...sources})
  const vdom$ = view(sources.onion.state$)

  return {
    DOM: xs.combine(vdom$, viewer$.DOM)
      .map(vtrees => (
        <div>{vtrees}</div>
      )),
    onion: reducer$
  }
}

function intent (domSource) {
  const request$ = domSource.select('.uk-card').events('click')
    .map(event => event.currentTarget)
    .map(target => target.attributes.getNamedItem('href').value)

  return {
    request$
  }
}

function model (actions) {
  const defaultReducer$ = xs.of(defaultReducer)
  const viewArticle$ = actions.request$.map(articleReducer)
  return xs.merge(defaultReducer$, viewArticle$)
}

function view (state) {
  return state
    .filter(hasArticles)
    .map(sortArticles)
    .map(Feed)
    .startWith('')
}

function hasArticles ({articles}) {
  return articles && articles.length > 0
}

function sortArticles ({articles}) {
  return articles.sort(byIndex)
}

function byIndex (a, b) {
  return b.index - a.index
}

function defaultReducer (prevState) {
  return prevState || {viewing: '', articles: []}
}

function articleReducer (viewing) {
  return function viewingReducer (prevState) {
    return {...prevState, viewing}
  }
}
