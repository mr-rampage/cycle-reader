import { run } from '@cycle/most-run'
import { makeDOMDriver } from '@cycle/dom'
import { UrlInputComponent } from './url-input-component'

run(UrlInputComponent, {
  DOM: makeDOMDriver('#root')
})
