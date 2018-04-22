export function Articles$ (feed$) {
  return feed$.fold((list, articles) => list.concat(articles).sort(byDate), [])
}

function byDate (a, b) {
  if (a.date < b.date) {
    return 1
  } else if (a.date > b.date) {
    return -1
  } else {
    return 0
  }
}
