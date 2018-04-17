import { Feed } from './feed'

export function RssList ({props}) {
  const model$ = props.feed$

  const vdom$ = model$
    .fold((list, articles) => list.concat(articles).sort(byDate), [])
    .filter(feed => feed.length)
    .map(Feed)
    .startWith('')

  return {
    DOM: vdom$,
    value: model$
  }
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
