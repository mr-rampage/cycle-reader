import {run} from '@cycle/most-run'
import {makeDOMDriver} from '@cycle/dom'
import { UrlInput } from './url-input'

run(UrlInput, {
  DOM: makeDOMDriver('#root')
})
