import { adapt } from '@cycle/run/lib/adapt'

export function makeSelectableDriver (driver) {
  return function (sink$) {
    const source$ = driver(sink$)

    return {
      select: select.bind(null, source$)
    }
  }
}

function select (message$, category) {
  const byCategory$ = message$.filter(event => event.request && event.request.category === category)
  return adapt(byCategory$)
}
