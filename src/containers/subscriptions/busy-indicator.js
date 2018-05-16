import { Spinner } from '../../components/spinner'

export default function BusyIndicator (sources) {
  const vdom$ = view(sources.onion.state$)

  return {
    DOM: vdom$
  }
}

function view (stateSource) {
  return stateSource
    .map(Spinner)
    .startWith('')
}
