import { Search } from './search'
import sampleCombine from 'xstream/extra/sampleCombine'

const isUrl = new RegExp('^(https?):\\/\\/[^\\s/$.?#].[^\\s]*$', 'i')

export function UrlInput ({DOM}) {
  const submit$ = dom$ => dom$.select('.uk-search').events('submit')
  const search$ = dom$ => dom$.select('.uk-search-input').events('input')

  const intent = sources => submit$(sources)
    .compose(sampleCombine(search$(sources)))
    .map(([submitEvent, inputEvent]) => {
      submitEvent.preventDefault()
      return inputEvent.target.value
    })

  const model = intent$ => intent$
    .filter(input => isUrl.test(input))
    .startWith('')

  const view = model$ => model$.map(Search)

  const url$ = model(intent(DOM))

  return {
    DOM: view(url$),
    value: url$
  }
}
