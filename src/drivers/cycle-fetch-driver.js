import xs from 'xstream'
import 'whatwg-fetch'
import {adapt} from '@cycle/run/lib/adapt'

export function makeFetchDriver () {
  return function fetchDriver (request$) {
    const response$$ = request$
      .map(requestsInputToResponse$)
    response$$.addListener({
      next: () => {},
      error: () => {},
      complete: () => {}
    })
    return {
      select: byCategory.bind(null, response$$)
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

function createResponse$ (request) {
  return xs.create({
    start: listener => {
      const {url, options} = request
      fetch(url, options)
        .then(response => response.json())
        .then(response => listener.next(response))
        .catch(listener.error)
    },
    stop: () => {}
  })
}

function byCategory (response$$, category) {
  return adapt(response$$
    .filter(response$ => response$.request && response$.request.category === category))
}
