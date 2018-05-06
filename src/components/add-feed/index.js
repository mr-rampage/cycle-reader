import xs from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'
import { Search } from './search'
import { isUrl } from '../../domain/urls'
import { unmarshal } from '../../domain/rss-to-json'

export function AddFeed (sources) {
  const actions = intent(sources.onion.state$, sources.DOM, sources.FETCH, sources.props)
  const reducer$ = model(actions)
  const vdom$ = view(sources.onion.state$)

  return {
    DOM: vdom$,
    FETCH: actions.fetchFeed$,
    onion: reducer$
  }
}

function intent (stateSource, domSource, fetchSource, propSource) {
  const submit$ = domSource.select('.uk-search').events('submit', {preventDefault: true})
  const search$ = domSource.select('.uk-search-input').events('input')

  const addFeed$ = submit$
    .compose(sampleCombine(search$))
    .map(([submitEvent, inputEvent]) => inputEvent.target.value)

  const fetchFeed$ = stateSource
    .filter(state => !!state.uri && state.reset === false)
    .map(({uri}) => uri)
    .map(uri => ({uri, category: propSource.category}))

  const fetchedFeed$ = fetchSource.select(propSource.category)
    .flatten()
    .map(unmarshal)
    .flatten()

  const resetFeed$ = stateSource
    .filter(({reset}) => reset)

  return {
    addFeed$,
    fetchFeed$,
    fetchedFeed$,
    resetFeed$
  }
}

function model (actions) {
  const defaultReducer$ = xs.of(prevState => {
    return prevState || {uri: '', articles: [], reset: false}
  })

  const uriReducer$ = actions.addFeed$
    .filter(isUrl)
    .map(uri => prevState => ({...prevState, uri}))

  const articlesReducer$ = actions.fetchedFeed$
    .map(articles => prevState => ({...prevState, articles}))

  const resetReducer$ = actions.resetFeed$
    .compose(sampleCombine(defaultReducer$))
    .map(([_, initialState]) => () => initialState())

  return xs.merge(defaultReducer$, uriReducer$, articlesReducer$, resetReducer$)
}

function view (state$) {
  return state$.map(Search)
}
