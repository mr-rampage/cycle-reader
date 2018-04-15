import { Search } from './search'
import xs from 'xstream'

const isUrl = new RegExp('^(https?|ftp):\\/\\/[^\\s/$.?#].[^\\s]*$', 'i')

export function UrlInput (sources) {

  const onSubmit = sources => sources.DOM.select('.uk-search').events('submit')
  const onInput = sources => sources.DOM.select('.uk-search-input').events('input')

  const intent = sources => xs.combine(onSubmit(sources), onInput(sources))
    .map(([submitEvent, inputEvent]) => {
      submitEvent.preventDefault()
      return inputEvent.target.value
    })

  const model = intent$ => intent$
    .debug()
    .filter(input => isUrl.test(input))
    .startWith('')

  const view = model$ => model$.map(Search)

  const url$ = model(intent(sources))

  return {
    DOM: view(url$),
    value: url$
  }
}
