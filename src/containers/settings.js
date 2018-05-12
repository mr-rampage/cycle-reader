import xs from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'
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
  const submit$ = domSource.select('form').events('submit', {preventDefault: true})
  const proxy$ = domSource.select('.uk-input').events('input')

  const setProxy$ = submit$
    .compose(sampleCombine(proxy$))
    .map(([submitEvent, inputEvent]) => inputEvent.target.value)

  return {
    setProxy$
  }
}

function model (actions) {
  const defaultReducer$ = xs.of(defaultReducer)

  const uriReducer$ = actions.setProxy$
    .map(proxyReducer)

  return xs.merge(defaultReducer$, uriReducer$)
}

function view (state$) {
  return state$.map(SettingsMenu)
}

function defaultReducer (prevState) {
  return prevState || {proxy: 'http://localhost:8080/'}
}

function proxyReducer (proxy) {
  return function uriReducer (prevState) {
    return {...prevState, proxy}
  }
}
