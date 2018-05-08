import xs from 'xstream'
import isolate from '@cycle/isolate'
import { Feed } from '../components/feed'
import { ArticleViewer } from './article-viewer'

export function ArticleList (sources) {
  const actions = intent(sources.DOM)
  const reducer$ = model(actions)

  const viewer$ = isolate(ArticleViewer, 'article')({...sources})
  const vdom$ = view(sources.onion.state$)

  return {
    DOM: xs.combine(vdom$, viewer$.DOM)
      .map(vtrees => (
        <div>{vtrees}</div>
      )),
    FETCH: viewer$.FETCH,
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
  const defaultReducer$ = xs.of(prevState => prevState || {viewing: '', articles: []})

  const viewArticle$ = actions.request$
    .map(viewing => prevState => ({ ...prevState, viewing }))

  return xs.merge(defaultReducer$, viewArticle$)
}

function view (state) {
  return state
    .filter(({articles}) => articles.length > 0)
    .map(({articles}) => articles.sort(byIndex))
    .map(Feed)
    .startWith('')
}

function byIndex (a, b) {
  return b.index - a.index
}
