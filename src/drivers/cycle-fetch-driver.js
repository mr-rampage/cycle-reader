import xs from 'xstream'
import 'whatwg-fetch'
import { adapt } from '@cycle/run/lib/adapt'
import dropRepeats from 'xstream/extra/dropRepeats'

export function makeFetchDriver () {
  return function fetchDriver (request$) {
    const response$$ = request$
      .compose(dropRepeats(sameRequest))
      .map(requestsInputToResponse$)

    return {
      select: select.bind(null, response$$)
    }
  }
}

function requestsInputToResponse$ (request) {
  const response$ = adapt(createResponse$(request).remember())
  Object.defineProperty(response$, 'request', {
    value: request,
    writable: false
  })
  return response$
}

function createResponse$ ({url, options}) {
  return xs.create({
    start: listener => {
      fetch(url, options)
        .then(response => response.json())
        .then(response => listener.next(response))
        .catch(listener.error)
    },
    stop: () => {}
  })
}

function select (response$$, category) {
  const byCategory$$ = response$$.filter(response$ => response$.request && response$.request.category === category)
  return adapt(byCategory$$)
}

function sameRequest (previous, current) {
  return previous.url === current.url
}
