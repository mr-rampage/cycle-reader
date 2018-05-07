import xs from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'
import isolate from '@cycle/isolate'
import { Search } from './search'
import { isUrl } from '../../domain/urls'
import { unmarshal } from '../../domain/rss-to-json'
import { FetchClient } from '../http-client'

export function AddFeed (sources) {
  const feedSource = isolate(FetchClient('rss'), 'uri')(sources)

  const actions = intent(sources.onion.state$, sources.DOM, feedSource.response)
  const reducer$ = model(actions)
  const vdom$ = view(sources.onion.state$)

  return {
    DOM: vdom$,
    FETCH: feedSource.FETCH,
    onion: reducer$
  }
}

function intent (stateSource, domSource, feedSource) {
  const submit$ = domSource.select('.uk-search').events('submit', {preventDefault: true})
  const search$ = domSource.select('.uk-search-input').events('input')

  const addFeed$ = submit$
    .compose(sampleCombine(search$))
    .map(([submitEvent, inputEvent]) => inputEvent.target.value)

  const fetchedFeed$ = feedSource
    .map(unmarshal)
    .flatten()

  return {
    addFeed$,
    fetchedFeed$
  }
}

function model (actions) {
  const defaultReducer$ = xs.of(prevState => {
    return prevState || {uri: '', articles: []}
  })

  const uriReducer$ = actions.addFeed$
    .filter(isUrl)
    .map(uri => () => ({uri, articles: []}))

  const articlesReducer$ = actions.fetchedFeed$
    .map(articles => prevState => ({...prevState, articles}))

  return xs.merge(defaultReducer$, uriReducer$, articlesReducer$)
}

function view (state$) {
  return state$.map(Search)
}
