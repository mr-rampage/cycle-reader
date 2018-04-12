import { p } from '@cycle/dom'
import * as most from 'most'

const intent = sources => most.of(sources)

const model = intent$ => intent$
  .startWith(false)

const view = model$ => model$.map(isValid =>
  p(`${isValid ? 'Yes' : 'No'}`)
)

export function ValidMarker (sources) {
  const sinks = {
    DOM: view(model(intent(sources)))
  }

  return sinks
}
