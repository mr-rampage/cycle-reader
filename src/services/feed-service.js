import xs from 'xstream'
import isolate from '@cycle/isolate'
import { unmarshal } from '../domain/rss-to-json'
import { FetchClient } from './fetch-client'

const FETCH_FEED = 'fetch-feed'

export default function FetchFeed (sources) {
  const actions = isolate(FetchClient(FETCH_FEED), 'uri')(sources)
  const reducer$ = model(actions.FETCH, actions.response.map(unmarshal).flatten())

  return {
    category: FETCH_FEED,
    FETCH: actions.FETCH,
    onion: reducer$
  }
}

function model (fetchingAction, fetchedAction) {
  const fetching$ = fetchingAction
    .map(() => prevState => ({...prevState, fetching: true}))

  const fetched$ = fetchedAction
    .map(articles => prevState => ({...prevState, articles, fetching: false}))

  return xs.merge(fetching$, fetched$)
}
