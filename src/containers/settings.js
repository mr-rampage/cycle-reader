import xs from 'xstream'
import dropRepeats from 'xstream/extra/dropRepeats'
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
  const inputChange$ = domSource.select('.uk-input').events('change')

  const updateSetting$ = inputChange$
    .map((inputEvent) => ({[inputEvent.target.name]: inputEvent.target.value}))

  return {
    updateSetting$
  }
}

function model (actions) {
  const defaultReducer$ = xs.of(defaultReducer)
  const settingReducer$ = actions.updateSetting$.map(settingsReducer)

  return xs.merge(defaultReducer$, settingReducer$)
}

function view (state$) {
  return state$.map(SettingsMenu)
}

function persist (sources) {
  return sources.onion.state$
    .drop(1)
    .compose(dropRepeats())
    .map(settings => $put(SETTINGS_DB, settings))
}

function defaultReducer (prevState) {
  return {proxy: '', ...prevState}
}

function settingsReducer (setting) {
  return function settingsReducer (prevState) {
    return {...prevState, ...setting}
  }
}
