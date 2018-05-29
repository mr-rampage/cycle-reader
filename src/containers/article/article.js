import { extractContent } from '../../domain/article-extractor'

export function ArticleView (sources) {
  return {
    DOM: view(sources.onion.state$)
  }
}

function view (articleSource) {
  return articleSource
    .map(state => state.article)
    .map(article => new DOMParser().parseFromString(article.body, 'text/html'))
    // pair & switch map to the article from IDB to get the description
    .map(article => extractContent(article))
    .map(Article)
    .startWith('')
}

function Article (body) {
  return (
    <div className='uk-animation-slide-bottom' innerHTML={body.outerHTML}></div>
  )
}
