import xs from 'xstream'
import isolate from '@cycle/isolate'
import FetchFeed from './feed-service'
import FetchArticle from './article-service'

export default function FetchService (sources) {
  const feedFetches = isolate(FetchFeed, 'new-feed')(sources)
  const articleFetches = isolate(FetchArticle, 'feed-list')(sources)

  const request$ = xs.merge(feedFetches.FETCH, articleFetches.FETCH)
  const response$ = xs.merge(feedFetches.response, articleFetches.response)
  const fetching$ = model(request$, response$)

  return {
    FETCH: request$,
    onion: xs.merge(feedFetches.onion, articleFetches.onion, fetching$)
  }
}

function model (request$, response$) {
  return xs.merge(
    request$.map(() => true),
    response$.map(() => false)
  ).map(fetching => prevState => ({...prevState, fetching}))
}
