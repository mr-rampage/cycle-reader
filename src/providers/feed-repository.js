import { $put } from 'cycle-idb'

export function subscribeFeed ({FETCH, props}) {
  const successfulFetch$ = props.feed
    .map(([feed, url]) => url)

  return {
    IDB: successfulFetch$.map(href => $put(props.db, {href}))
  }
}
