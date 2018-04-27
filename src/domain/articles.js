import xs from 'xstream'

export function Articles$ (initialArticles$, newArticles$) {
  return xs.merge(initialArticles$, newArticles$)
    .fold((list, articles) => list.concat(articles), [])
    .filter(articles => articles.length > 0)
}
