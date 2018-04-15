import { Search } from './search'

const isUrl = new RegExp('^(https?|ftp):\\/\\/[^\\s/$.?#].[^\\s]*$', 'i')

export function UrlInput (sources) {
  const onUrlInput = sources => sources.DOM
    .select('.uk-search-input')
    .events('input')
    .map(event => event.target.value)

  const validUrls = intent$ => intent$
    .filter(input => isUrl.test(input))
    .startWith('')

  const render = model$ => model$
    .map(Search)

  const url$ = validUrls(onUrlInput(sources))

  return {
    DOM: render(url$),
    value: url$
  }
}
