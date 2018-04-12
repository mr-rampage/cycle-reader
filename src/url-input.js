import { div, input, p } from '@cycle/dom'
import * as most from 'most'
import { ValidMarker } from './valid-marker'

const intent = sources => sources.DOM
  .select('.name')
  .events('input')

const isUrl = new RegExp('^(https?|ftp):\\/\\/[^\\s/$.?#].[^\\s]*$', 'i')

const textModel = intent$ => intent$
  .map(event => event.target.value)
  .filter(input => isUrl.test(input))
  .startWith('')

const validModel = intent$ => intent$
  .map(event => event.target.value)
  .map(input => isUrl.test(input))
  .startWith(false)

const model = intent$ => most.combine((value, valid) => ([value, valid]), textModel(intent$), validModel(intent$))

const view = model$ => model$.map(([data, isValid]) =>
  div(`.name`, [
    p(`${data}`),
    input(),
    ValidMarker(isValid)
  ])
)

export function UrlInput (sources) {
  const sinks = {
    DOM: view(model(intent(sources)))
  }

  return sinks
}
