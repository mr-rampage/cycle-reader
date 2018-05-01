import { $put } from 'cycle-idb'
import { byCategory } from '../domain/response-filter'

export function subscribeFeed ({WORKER, props}) {
  const successfulFetch$ = WORKER
    .filter(byCategory.bind(null, props.category))
    .map(response => response.request.href)

  return {
    IDB: successfulFetch$.map(href => $put(props.db, {href}))
  }
}
