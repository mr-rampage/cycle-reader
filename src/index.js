import 'babel-polyfill'

import { run } from '@cycle/xstream-run'
import { makeDOMDriver } from '@cycle/dom'
import makeIdbDriver from 'cycle-idb'
import { main } from './app'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import { makeWebWorkerDriver } from 'cycle-webworker'
import { makeSelectableDriver } from './drivers/cycle-selectable-driver'
import { makeHashHistoryDriver } from '@cycle/history'
import onionify from 'cycle-onionify'
import { makeFetchDriver } from './drivers/cycle-fetch-driver'
import ArticleWorker from './workers/article.worker'
import runtime from 'serviceworker-webpack-plugin/lib/runtime'
import { routerify } from 'cyclic-router'
import switchPath from 'switch-path'

const DATABASE = 'cycle-reader'
export const ARTICLE_DB = 'article-db'
export const FEED_DB = 'feed-db'
export const SETTINGS_DB = 'settings-db'

// loads the Icon plugin
UIkit.use(Icons)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => runtime.register())
}
run(init(), drivers())

function drivers () {
  return {
    DOM: makeDOMDriver('#root'),
    IDB: makeIdbDriver(DATABASE, 1, upgradeDb => {
      switch (upgradeDb.oldVersion) {
        case 0: {
          upgradeDb.createObjectStore(ARTICLE_DB, {keyPath: 'link', autoIncrement: true})
          upgradeDb.createObjectStore(FEED_DB, {keyPath: 'href', autoIncrement: true})
          upgradeDb.createObjectStore(SETTINGS_DB, {keyPath: 'profile'})
        }
      }
    }),
    FETCH: selectFetchDriver(),
    history: makeHashHistoryDriver({
      hashType: 'hashbang'
    })
  }
}

function selectFetchDriver () {
  if (window.Worker) {
    console.info('Fetch Driver: Web Worker')
    return makeSelectableDriver(makeWebWorkerDriver(ArticleWorker()))
  } else {
    console.info('Fetch Driver: Fetch')
    return makeFetchDriver()
  }
}

function init () {
  return routerify(onionify(main), switchPath)
}
