import xs from 'xstream'
import dropRepeats from 'xstream/extra/dropRepeats'
import ArticlesPage from './containers/articles'
import SettingsPage from './containers/settings'
import SubscriptionPage from './containers/subscriptions'
import { NavBar } from './components/navbar'
import ArticlePage from './containers/article'

export default function Router (sources) {
  const match$ = sources.router.define({
    '/': ArticlesPage,
    '/settings': SettingsPage,
    '/subscriptions': SubscriptionPage,
    '/article': ArticlePage
  })

  const page$ = match$.map(({path, value}) => {
    return value({...sources, router: sources.router.path(path)})
  })

  const navigation$ = xs.merge(
    navBar(sources),
    viewArticle(sources)
  )

  return {
    DOM: view(page$.map(propOrNever.bind(null, 'DOM')).flatten()),
    router: navigation$,
    FETCH: page$.map(propOrNever.bind(null, 'FETCH')).flatten(),
    IDB: page$.map(propOrNever.bind(null, 'IDB')).flatten(),
    onion: page$.map(propOrNever.bind(null, 'onion')).flatten()
  }
}

function view (vDom$) {
  return vDom$
    .map(view => (
      <div>
        <div>{NavBar()}</div>
        <div>{view}</div>
      </div>
    ))
}

function navBar (sources) {
  return sources.DOM
    .select('.uk-navbar-nav a')
    .events('click', {preventDefault: true})
    .map(e => e.target.pathname)
}

function viewArticle (sources) {
  return sources.onion.state$
    .filter(state => state['feed-list'] && state['feed-list']['article'])
    .map(state => state['feed-list']['article'])
    .compose(dropRepeats())
    .filter(article => article)
    .map(() => '/article')
}

function propOrNever (property, component) {
  return component[property] || xs.never()
}
