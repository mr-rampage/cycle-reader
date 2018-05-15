import { Spinner } from '../components/spinner'

export default function BusyIndicator (sources) {
  const vdom$ = sources.onion.state$
    .map(Spinner)
    .startWith('')

  return {
    DOM: vdom$
  }
}
