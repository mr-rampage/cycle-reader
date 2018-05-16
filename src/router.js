import xs from 'xstream'
import ArticlesPage from './containers/articles'
import SettingsPage from './containers/settings'
import SubscriptionPage from './containers/subscriptions'
import { NavBar } from './components/navbar'

export default function Router (sources) {
  const match$ = sources.router.define({
    '/': ArticlesPage,
    '/settings': SettingsPage,
    '/subscriptions': SubscriptionPage
  })

  const page$ = match$.map(({path, value}) => {
    return value({...sources, router: sources.router.path(path)})
  })

  const navigation$ = sources.DOM
    .select('.uk-navbar-nav a')
    .events('click', {preventDefault: true})
    .map(e => e.target.pathname)

  return {
    DOM: view(page$.map(propOrNever.bind(null, 'DOM')).flatten()),
    router: navigation$,
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

function propOrNever (property, component) {
  return component[property] || xs.never()
}
