import xs from 'xstream'

export function periodicRefresh ({IDB, props}) {
  const intent = period => xs.periodic(period)

  const model = intent$ => intent$
    .map(() => IDB.store(props.db).getAllKeys())
    .flatten()
    .map(xs.fromArray)
    .flatten()
    .map(url => ({url, category: props.category}))

  return {
    FETCH: model(intent(90000))
  }
}
