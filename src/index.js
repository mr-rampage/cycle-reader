import { run } from '@cycle/xstream-run'
import { makeDOMDriver } from '@cycle/dom'
import { makeHTTPDriver } from '@cycle/http'
import { main } from './app'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

// loads the Icon plugin
UIkit.use(Icons)

run(main, {
  DOM: makeDOMDriver('#root'),
  HTTP: makeHTTPDriver()
})
