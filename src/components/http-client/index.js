export function FetchClient (category) {
  return function RestClient (sources) {
    const actions = intent(sources.onion.state$, sources.FETCH)

    return {
      FETCH: actions.request$,
      response: actions.response$
    }
  }

  function intent (stateSource, fetchSource) {
    const request$ = stateSource
      .filter(state => !!state)
      .map(uri => ({uri, category}))

    const response$ = fetchSource.select(category)
      .flatten()

    return {
      request$,
      response$
    }
  }
}
