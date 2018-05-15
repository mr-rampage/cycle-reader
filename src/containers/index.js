import xs from 'xstream'
import isolate from '@cycle/isolate'
import AddFeed from './add-feed'
import ArticleList from './article-list'
import Settings from './settings'
import BusyIndicator from './busy-indicator'
import Feeds from './feeds'

export default function UI (sources) {
  const addFeed = isolate(AddFeed, 'new-feed')(sources)
  const articleList = isolate(ArticleList, 'feed-list')(sources)
  const settings = isolate(Settings, 'settings')(sources)
  const busy = isolate(BusyIndicator, 'fetching')(sources)
  const feeds = isolate(Feeds, 'feeds')(sources)

  return {
    DOM: view(addFeed.DOM, busy.DOM, articleList.DOM, settings.DOM, feeds.DOM),
    onion: xs.merge(addFeed.onion, articleList.onion, settings.onion)
  }
}

function view (...vtree) {
  return xs.combine.apply(null, vtree)
    .map(([addFeed, busy, list, settings, feeds]) => (
      <div>
        <div className='uk-flex uk-flex-middle uk-padding-small uk-padding-remove-top uk-padding-remove-bottom'>
          {addFeed}{busy}
        </div>
        <div>
          {feeds}
        </div>
        {settings}
        {list}
      </div>
    ))
}
