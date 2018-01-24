import * as most from 'most'

export function App (sources) {
  const vtree$ = most.of(
    <div>My Awesome Cycle.js app</div>
  )
  const sinks = {
    DOM: vtree$
  }
  return sinks
}
