import isolate from '@cycle/isolate'
import FetchArticle from './article-service'

export default function FetchService (sources) {
  const articleFetches = isolate(FetchArticle, 'feed-list')(sources)

  return {
    ...articleFetches
  }
}
