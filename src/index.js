import { run } from '@cycle/xstream-run'
import { makeDOMDriver } from '@cycle/dom'
import { main } from './app'

run(main, {
  DOM: makeDOMDriver('#root')
})
