import xs from 'xstream'
import isolate from '@cycle/isolate'
import { FetchClient } from './fetch-client'

const VIEW_ARTICLE = 'view-article'

export default function FetchArticle (sources) {
  const actions = isolate(FetchClient(VIEW_ARTICLE), 'viewing')(sources)
  const reducer$ = model(actions.FETCH, actions.response)

  return {
    category: VIEW_ARTICLE,
    FETCH: actions.FETCH,
    onion: reducer$
  }
}

function model (fetchingAction, fetchedAction) {
  const fetching$ = fetchingAction
    .map(() => prevState => ({...prevState, fetching: true}))

  const fetched$ = fetchedAction
    .map(article => prevState => ({...prevState, article, fetching: false}))

  return xs.merge(fetching$, fetched$)
}
