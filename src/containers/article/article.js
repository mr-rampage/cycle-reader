export function ArticleView (sources) {
  return {
    DOM: view(sources.onion.state$)
  }
}

function view (articleSource) {
  return articleSource
    .map(state => state.article)
    .map(Article)
    .startWith('')
}

function Article ({body}) {
  return (
    <div className='uk-animation-slide-bottom' innerHTML={body}></div>
  )
}
