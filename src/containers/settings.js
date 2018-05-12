import xs from 'xstream'
import { SettingsMenu } from '../components/settings-menu'
import { $put } from 'cycle-idb'
import { SETTINGS_DB } from '../index'

export default function Settings (sources) {
  const actions = intent(sources.DOM)
  const reducer$ = model(actions)
  const vdom$ = view(sources.onion.state$)
  const persist$ = persist(sources)

  return {
    DOM: vdom$,
    IDB: persist$,
    onion: reducer$
  }
}

function intent (domSource) {
  const proxy$ = domSource.select('.uk-input').events('change')

  const updateSetting$ = proxy$
    .map((inputEvent) => ({[inputEvent.target.name]: inputEvent.target.value}))

  return {
    updateSetting$
  }
}

function model (actions) {
  const defaultReducer$ = xs.of(defaultReducer)

  const settingReducer$ = actions.updateSetting$
    .map(updateSetting)

  return xs.merge(defaultReducer$, settingReducer$)
}

function view (state$) {
  return state$.map(SettingsMenu)
}

function persist (sources) {
  return sources.onion.state$
    .drop(1)
    .map(settings => $put(SETTINGS_DB, settings))
}

function defaultReducer (prevState) {
  return {proxy: '', ...prevState}
}

function updateSetting (setting) {
  return function uriReducer (prevState) {
    return {...prevState, ...setting}
  }
}
