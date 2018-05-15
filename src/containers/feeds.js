export default function Feeds (sources) {
  const vdom$ = view(sources.onion.state$)
  return {
    DOM: vdom$
  }
}

function view (stateSource) {
  return stateSource.map(feeds =>
    <ul>
      {feeds.map(subscription => <li>{subscription.href}</li>)}
    </ul>
  )
}
