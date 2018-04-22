import { Search } from './search'
import sampleCombine from 'xstream/extra/sampleCombine'
import { Url$ } from '../../domain/urls'

export function RssSearch (dom$) {
  const submit$ = dom$.select('.uk-search').events('submit')
  const search$ = dom$.select('.uk-search-input').events('input')

  const action$ = submit$
    .compose(sampleCombine(search$))
    .map(([submitEvent, inputEvent]) => {
      submitEvent.preventDefault()
      return inputEvent.target.value
    })

  const url$ = Url$(action$)

  const vdom$ = url$
    .startWith('')
    .map(Search)

  return {
    DOM: vdom$,
    value: url$
  }
}
