import isolate from '@cycle/isolate'
import { ArticleView } from './article'

export default function ArticlePage (sources) {
  const articleList = isolate(ArticleView, 'feed-list')(sources)

  return {
    DOM: articleList.DOM,
    onion: articleList.onion
  }
}
