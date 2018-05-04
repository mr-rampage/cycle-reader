import { unmarshal } from '../domain/rss-to-json'

export function Rss ({onion, FETCH}) {
  const request$ = onion.state$
    .filter(state => !!state.feed.url)
    .map(state => state.feed)
    .map(({url, category}) => ({url, category}))

  const feed$ = onion.state$
    .map(state => state.feed)
    .map(({category}) => FETCH.select(category).flatten())
    .flatten()

  const articles$ = feed$
    .map(unmarshal)
    .flatten()

  const reducer$ = articles$.map(articles => prevState => {
    let state = {...prevState}
    state.articles.fetched = articles
    return state
  })

  return {
    FETCH: request$,
    articles: articles$,
    feed: feed$,
    onion: reducer$
  }
}
