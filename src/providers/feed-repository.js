import { $put } from 'cycle-idb'

export function subscribeFeed ({FETCH, props}) {
  const successfulFetch$ = props.feed
    .map(response => response.request.href)

  return {
    IDB: successfulFetch$.map(href => $put(props.db, {href}))
  }
}
