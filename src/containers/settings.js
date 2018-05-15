import xs from 'xstream'
import { SettingsMenu } from '../components/settings-menu'

export default function Settings (sources) {
  const actions = intent(sources.DOM)
  const reducer$ = model(actions)
  const vdom$ = view(sources.onion.state$)

  return {
    DOM: vdom$,
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

function defaultReducer (prevState) {
  return {proxy: '', ...prevState}
}

function settingsReducer (setting) {
  return function settingsReducer (prevState) {
    return {...prevState, ...setting}
  }
}
