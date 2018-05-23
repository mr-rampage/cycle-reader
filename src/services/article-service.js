import isolate from '@cycle/isolate'
import { FetchClient } from './fetch-client'

const VIEW_ARTICLE = 'view-article'

export default function FetchArticle (sources) {
  const actions = isolate(FetchClient(VIEW_ARTICLE), 'viewing')(sources)
  const reducer$ = model(actions.response)

  return {
    response: actions.response,
    FETCH: actions.FETCH,
    onion: reducer$
  }
}

function model (fetchedAction) {
  const fetched$ = fetchedAction
    .map(articleReducer)

  return fetched$
}

function articleReducer (article) {
  return function articleReducer (prevState) {
    return {...prevState, article}
  }
}
