import { div, input, p } from '@cycle/dom'
import { ValidMarkerComponent } from './valid-marker-component'
import * as most from 'most'

const onUrlInput = sources => sources.DOM
  .select('.name')
  .events('input')
  .map(event => event.target.value)

const isUrl = new RegExp('^(https?|ftp):\\/\\/[^\\s/$.?#].[^\\s]*$', 'i')

const validUrls = intent$ => intent$
  .filter(input => isUrl.test(input))
  .startWith('')

const urlValidity = intent$ => intent$
  .map(input => isUrl.test(input))

export function UrlInputComponent (sources) {
  const indicatorVDom$ = ValidMarkerComponent({...sources, props: urlValidity(onUrlInput(sources))})

  const render = model$ => most.combine((a, b) => [a, b], model$, indicatorVDom$.DOM)
    .map(([url, indicatorVDom]) =>
      div(`.name`, [
        p(`${url}`),
        input(),
        indicatorVDom
      ])
    )

  const sinks = {
    DOM: render(validUrls(onUrlInput(sources)))
  }

  return sinks
}
