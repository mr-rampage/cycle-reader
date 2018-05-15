import xs from 'xstream'
import dropRepeats from 'xstream/extra/dropRepeats'
import { $put } from 'cycle-idb'
import { SETTINGS_DB } from '../index'

export default function SettingsStore (sources) {
  const actions = persistSettings(sources.onion.state$)
  const reducer$ = model(sources)

  return {
    IDB: actions.persist$,
    onion: reducer$
  }
}

function persistSettings (stateSource) {
  const persist$ = stateSource
    .drop(1)
    .compose(dropRepeats())
    .map(settings => $put(SETTINGS_DB, settings))

  return {
    persist$
  }
}

function model (sources) {
  const defaultReducer$ = xs.of(defaultReducer)

  const reducer$ = sources.IDB.store(SETTINGS_DB).get('default')
    .take(1)
    .map(settingsReducer)

  return xs.merge(defaultReducer$, reducer$)
}

function defaultReducer (prevState) {
  return prevState || {profile: 'default', proxy: ''}
}

function settingsReducer (settings) {
  return function (prevState) {
    return {...prevState, ...settings}
  }
}
