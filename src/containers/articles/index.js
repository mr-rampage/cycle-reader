import isolate from '@cycle/isolate'
import ArticleList from './article-list'

export default function ArticlesPage (sources) {
  const articleList = isolate(ArticleList, 'feed-list')(sources)

  return {
    DOM: articleList.DOM,
    onion: articleList.onion
  }
}
