import { div, input, p } from '@cycle/dom'

const intent = sources => sources.DOM
  .select('.name')
  .events('input')

const isUrl = new RegExp('^(https?|ftp):\\/\\/[^\\s/$.?#].[^\\s]*$', 'i')

const model = intent$ => intent$
  .map(event => event.target.value)
  .filter(input => isUrl.test(input))
  .startWith('')


const view = model$ => model$.map(url =>
  div(`.name`, [
    p(`${url}`),
    input()
  ])
)

export function UrlInput (sources) {
  const sinks = {
    DOM: view(model(intent(sources)))
  }

  return sinks
}
