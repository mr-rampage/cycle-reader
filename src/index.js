import { run } from '@cycle/xstream-run'
import { makeDOMDriver } from '@cycle/dom'
import { makeFetchDriver } from './drivers/cycle-fetch-driver'
import makeIdbDriver from 'cycle-idb'
import { main } from './app'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

export const FEED_IDB = 'feed-db'

// loads the Icon plugin
UIkit.use(Icons)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./cache.worker.js'))
}

run(main, {
  DOM: makeDOMDriver('#root'),
  FETCH: makeFetchDriver(),
  IDB: makeIdbDriver(FEED_IDB, 1, upgradeDb => {
    switch (upgradeDb.oldVersion) {
      case 0: upgradeDb.createObjectStore(FEED_IDB, {keyPath: 'link', autoIncrement: true})
    }
  })
})
