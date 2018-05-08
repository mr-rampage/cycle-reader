import xs from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'
import { Search } from '../components/search'
import { isUrl } from '../domain/urls'

export function AddFeed (sources) {
  const actions = intent(sources.onion.state$, sources.DOM)
  const reducer$ = model(actions)
  const vdom$ = view(sources.onion.state$)

  return {
    DOM: vdom$,
    onion: reducer$
  }
}

function intent (stateSource, domSource) {
  const submit$ = domSource.select('.uk-search').events('submit', {preventDefault: true})
  const search$ = domSource.select('.uk-search-input').events('input')

  const addFeed$ = submit$
    .compose(sampleCombine(search$))
    .map(([submitEvent, inputEvent]) => inputEvent.target.value)

  return {
    addFeed$
  }
}

function model (actions) {
  const defaultReducer$ = xs.of(prevState => {
    return prevState || {uri: '', articles: []}
  })

  const uriReducer$ = actions.addFeed$
    .filter(isUrl)
    .map(uri => prevState => ({...prevState, uri}))

  return xs.merge(defaultReducer$, uriReducer$)
}

function view (state$) {
  return state$.map(Search)
}
