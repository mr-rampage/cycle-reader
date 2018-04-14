import { p } from '@cycle/dom'

export function ValidMarker (sources) {
  const vdom$ = sources.props
    .startWith(false)
    .map(isValid => isValid ? 'Yes' : 'No')
    .map(isValid => (
      p(`${isValid}`)
    ))

  return {
    DOM: vdom$
  }
}
