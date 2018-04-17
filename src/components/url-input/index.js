import { Search } from './search'
import sampleCombine from 'xstream/extra/sampleCombine'

const isUrl = new RegExp('^(https?):\\/\\/[^\\s/$.?#].[^\\s]*$', 'i')

export function UrlInput (dom$) {
  const submit$ = dom$.select('.uk-search').events('submit')
  const search$ = dom$.select('.uk-search-input').events('input')

  const action$ = submit$
    .compose(sampleCombine(search$))
    .map(([submitEvent, inputEvent]) => {
      submitEvent.preventDefault()
      return inputEvent.target.value
    })

  const url$ = action$
    .filter(input => isUrl.test(input))
    .startWith('')

  const vdom$ = url$.map(Search)

  return {
    DOM: vdom$,
    value: url$
  }
}
