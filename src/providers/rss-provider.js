import { unmarshal } from '../domain/rss-to-json'
import sampleCombine from 'xstream/extra/sampleCombine'

export function Rss ({FETCH, props}) {
  const request$ = props.url$
    .filter(url => url)
    .map(url => ({url, category: props.category}))

  const feed$ = FETCH
    .select(props.category)
    .flatten()

  const articles$ = feed$
    .map(unmarshal)
    .flatten()

  return {
    FETCH: request$,
    articles: articles$,
    feed: feed$.compose(sampleCombine(props.url$))
  }
}
