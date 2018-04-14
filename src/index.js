import { run } from '@cycle/xstream-run'
import { makeDOMDriver } from '@cycle/dom'
import { UrlInputComponent } from './components/url-input/url-input-component'

run(UrlInputComponent, {
  DOM: makeDOMDriver('#root')
})
