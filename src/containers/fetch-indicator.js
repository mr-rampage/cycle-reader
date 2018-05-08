import xs from 'xstream'
import { Spinner } from '../components/spinner'

export function FetchIndicator (sources) {
  const actions = intent(sources.props.requests, sources.props.responses)
  const vdom$ = view(actions.showSpinner$)

  return {
    DOM: vdom$
  }
}

function intent (request$, response$) {
  const showSpinner$ = xs.merge(
    request$.map(() => true),
    response$.map(() => false)
  )

  return {
    showSpinner$
  }
}

function view (showSpinner$) {
  return showSpinner$.map(Spinner).startWith('')
}