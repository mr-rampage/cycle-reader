import { Search } from './search'
import sampleCombine from 'xstream/extra/sampleCombine'
import { Url$ } from '../../domain/urls'
import xs from 'xstream'

export function RssSearch ({DOM}) {
  const submit$ = DOM.select('.uk-search').events('submit', {preventDefault: true})
  const search$ = DOM.select('.uk-search-input').events('input')

  const intent$ = submit$
    .compose(sampleCombine(search$))
    .map(([submitEvent, inputEvent]) => inputEvent.target.value)

  const model$ = Url$(intent$)

  const vdom$ = model$
    .startWith('')
    .map(Search)

  const defaultState$ = xs.of(prevState => prevState || {url: ''})
  const reducer$ = model$.map(url => prevState => ({...prevState, url}))

  return {
    DOM: vdom$,
    query: model$,
    onion: xs.merge(defaultState$, reducer$)
  }
}
