export function Articles$ (feed$) {
  return feed$.fold((list, articles) => list.concat(articles).sort(byDate), [])
}

function byDate (a, b) {
  if (a.created < b.created) {
    return 1
  } else if (a.created > b.created) {
    return -1
  } else {
    return 0
  }
}
