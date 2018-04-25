import { run } from '@cycle/xstream-run'
import { makeDOMDriver } from '@cycle/dom'
import { makeFetchDriver } from './drivers/cycle-fetch-driver'
import { main } from './app'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

// loads the Icon plugin
UIkit.use(Icons)

run(main, {
  DOM: makeDOMDriver('#root'),
  FETCH: makeFetchDriver()
})
