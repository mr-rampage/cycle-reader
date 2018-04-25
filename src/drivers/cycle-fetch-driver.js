import xs from 'xstream'
import 'whatwg-fetch'
import { adapt } from '@cycle/run/lib/adapt'
import dropRepeats from 'xstream/extra/dropRepeats'

export function makeFetchDriver () {
  return function fetchDriver (request$) {
    const response$$ = request$
      .debug()
      .compose(dropRepeats(sameRequest))
      .map(requestsInputToResponse$)

    response$$.addListener({
      next: () => {},
      error: () => {},
      complete: () => {}
    })

    return {
      select: select.bind(null, response$$)
    }
  }
}

function requestsInputToResponse$ (request) {
  const response$ = adapt(createResponse$(request).remember())
  response$.addListener({
    next: () => {},
    error: () => {},
    complete: () => {}
  })
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
  return adapt(response$$
    .filter(response$ => response$.request && response$.request.category === category))
}

function sameRequest (previous, current) {
  return previous.url === current.url
}
