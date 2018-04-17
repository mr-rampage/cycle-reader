import { Feed } from './feed'
import { feed } from '../../domain/feed'
import { xmlResponseAdapter } from '../../domain/xml-json.adapter'

export function RssList ({props}) {
  const request$ = props.feed$
    .map(({href, category}) => ({
      url: href,
      method: 'GET',
      category: category
    }))

  const model$ = props.response$
    .map(response => feed(xmlResponseAdapter(response)))

  const vDom$ = model$
    .fold((list, articles) => list.concat(articles).sort(byDate), [])
    .filter(feed => feed.length)
    .map(Feed)
    .startWith('')

  return {
    DOM: vDom$,
    HTTP: request$,
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
