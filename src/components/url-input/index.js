import { Search } from './search'

const isUrl = new RegExp('^(https?|ftp):\\/\\/[^\\s/$.?#].[^\\s]*$', 'i')

export function UrlInput (sources) {
  const intent = sources => sources.DOM
    .select('.uk-search-input')
    .events('input')
    .map(event => event.target.value)

  const model = intent$ => intent$
    .filter(input => isUrl.test(input))
    .startWith('')

  const view = model$ => model$.map(Search)

  const url$ = model(intent(sources))

  return {
    DOM: view(url$),
    value: url$
  }
}
