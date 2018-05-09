import xs from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'
import { Search } from '../components/search'
import { isUrl } from '../domain/urls'

export default function AddFeed (sources) {
  const actions = intent(sources.DOM)
  const reducer$ = model(actions)
  const vdom$ = view(sources.onion.state$)

  return {
    DOM: vdom$,
    onion: reducer$
  }
}

export function intent (domSource) {
  const submit$ = domSource.select('.uk-search').events('submit', {preventDefault: true})
  const search$ = domSource.select('.uk-search-input').events('input')

  const addFeed$ = submit$
    .compose(sampleCombine(search$))
    .map(([submitEvent, inputEvent]) => inputEvent.target.value)

  return {
    addFeed$
  }
}

export function model (actions) {
  const defaultReducer$ = xs.of(defaultReducer)

  const uriReducer$ = actions.addFeed$
    .filter(isUrl)
    .map(uriReducer)

  return xs.merge(defaultReducer$, uriReducer$)
}

function view (state$) {
  return state$.map(Search)
}

export function defaultReducer (prevState) {
  return prevState || {uri: '', articles: []}
}

export function uriReducer (uri) {
  return function reducer (prevState) {
    return {...prevState, uri}
  }
}
