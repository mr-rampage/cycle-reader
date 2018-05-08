import xs from 'xstream'
import isolate from '@cycle/isolate'
import { Spinner } from '../components/spinner'
import { unmarshal } from '../domain/rss-to-json'
import { FetchClient } from './fetch-client'

const FETCH_FEED = 'fetch-feed'
const VIEW_ARTICLE = 'view-article'

export function FetchIndicator (sources) {
  const feedFetches = isolate(FetchFeed, 'new-feed')(sources)
  const articleFetches = isolate(FetchArticle, 'feed-list')(sources)

  const request$ = xs.merge(feedFetches.FETCH, articleFetches.FETCH)
  const response$ = xs.merge(sources.FETCH.select(FETCH_FEED), sources.FETCH.select(VIEW_ARTICLE))

  const vdom$ = view(request$, response$)

  return {
    DOM: vdom$,
    FETCH: request$,
    onion: xs.merge(feedFetches.onion, articleFetches.onion)
  }
}

function FetchFeed (sources) {
  const actions = isolate(FetchClient(FETCH_FEED), 'uri')(sources)
  const reducer$ = model(actions.response)

  return {
    FETCH: actions.FETCH,
    onion: reducer$
  }

  function model (fetchAction) {
    return fetchAction
      .map(unmarshal)
      .flatten()
      .map(articles => prevState => ({...prevState, articles}))
  }
}

function FetchArticle (sources) {
  const actions = isolate(FetchClient(VIEW_ARTICLE), 'viewing')(sources)
  const reducer$ = model(actions.response)

  return {
    FETCH: actions.FETCH,
    onion: reducer$
  }

  function model (fetchActions) {
    return fetchActions
      .map(article => prevState => ({...prevState, article}))
  }
}

function view (request$, response$) {
  const showSpinner$ = xs.merge(
    request$.map(() => true),
    response$.map(() => false)
  ).debug()

  return showSpinner$.map(Spinner).startWith('')
}
