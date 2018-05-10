import { run } from '@cycle/xstream-run'
import { makeDOMDriver } from '@cycle/dom'
import makeIdbDriver from 'cycle-idb'
import { main } from './app'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import { makeWebWorkerDriver } from 'cycle-webworker'
import { makeSelectableDriver } from './drivers/cycle-selectable-driver'
import onionify from 'cycle-onionify'
import { makeFetchDriver } from './drivers/cycle-fetch-driver'
import ArticleWorker from './workers/article.worker'

const DATABASE = 'cycle-reader'
export const ARTICLE_DB = 'article-db'
export const FEED_DB = 'feed-db'

// loads the Icon plugin
UIkit.use(Icons)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./cache.worker.js'))
}

run(onionify(main), {
  DOM: makeDOMDriver('#root'),
  IDB: makeIdbDriver(DATABASE, 1, upgradeDb => {
    switch (upgradeDb.oldVersion) {
      case 0: {
        upgradeDb.createObjectStore(ARTICLE_DB, {keyPath: 'link', autoIncrement: true})
        upgradeDb.createObjectStore(FEED_DB, {keyPath: 'href', autoIncrement: true})
      }
    }
  }),
  FETCH: selectFetchDriver()
})

function selectFetchDriver () {
  if (window.Worker) {
    console.info('Fetch Driver: Web Worker')
    return makeSelectableDriver(makeWebWorkerDriver(ArticleWorker()))
  } else {
    console.info('Fetch Driver: Fetch')
    return makeFetchDriver()
  }
}
