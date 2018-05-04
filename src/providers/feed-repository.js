import { $put } from 'cycle-idb'

export function subscribeFeed ({onion}) {
  const successfulFetch$ = onion.state$
    .filter(({url}) => url)

  return {
    IDB: successfulFetch$
      .map(({url, db}) => $put(db, {href: url}))
  }
}
