import xs from 'xstream'
import { adapt } from '@cycle/run/lib/adapt'
import dropRepeats from 'xstream/extra/dropRepeats'

export function makeSelectableDriver (driver) {
  return function (sink$) {
    const source$ = driver(
      sink$.compose(dropRepeats(sameRequest))
    )

    return {
      select: select.bind(null, source$)
    }
  }
}

function select (message$, category) {
  const select$$ = message$
    .filter(byCategory.bind(null, category))
    .map(xs.of)
  return adapt(select$$)
}

function byCategory (category, event) {
  return category
    ? event.request && event.request.category === category
    : true
}

function sameRequest (previous, current) {
  return previous.url === current.url
}
