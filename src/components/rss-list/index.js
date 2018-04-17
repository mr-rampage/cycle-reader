import { Feed } from './feed'
import { feed } from '../../domain/feed'
import { xmlResponseAdapter } from '../../domain/xml-json.adapter'
import sampleCombine from 'xstream/extra/sampleCombine'

export function RssList ({props}) {
  const request$ = props.feed$
    .compose(sampleCombine(props.category$))
    .map(([url, category]) => ({url, category}))

  const model$ = props.response$
    .map(response => feed(xmlResponseAdapter(response)))

  const vdom$ = model$
    .fold((list, articles) => list.concat(articles).sort(byDate), [])
    .filter(feed => feed.length)
    .map(Feed)
    .startWith('')

  return {
    DOM: vdom$,
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
