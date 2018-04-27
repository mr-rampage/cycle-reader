import xs from 'xstream'

export function Articles$ (sources, storeName) {
  const initialArticles$ = sources.IDB.store(storeName).getAll().take(1)
  const newArticles$ = sources.props.feed$

  return xs.merge(initialArticles$, newArticles$)
    .fold((list, articles) => list.concat(articles), [])
    .filter(articles => articles.length > 0)
}
