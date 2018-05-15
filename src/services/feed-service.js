import isolate from '@cycle/isolate'
import { unmarshal } from '../domain/rss-to-json'
import { FetchClient } from './fetch-client'

const FETCH_FEED = 'fetch-feed'

export default function FetchFeed (sources) {
  const actions = isolate(FetchClient(FETCH_FEED), 'uri')(sources)
  const reducer$ = model(actions.response)

  return {
    response: actions.response,
    FETCH: actions.FETCH,
    onion: reducer$
  }
}

function model (fetchedAction) {
  const fetched$ = fetchedAction
    .map(unmarshal)
    .flatten()
    .map(articles => prevState => ({...prevState, articles}))

  return fetched$
}
