import xs from 'xstream'
import isolate from '@cycle/isolate'
import AddFeed from './add-feed'
import BusyIndicator from './busy-indicator'
import Feeds from './feeds'

export default function SubscriptionsPage (sources) {
  const addFeed = isolate(AddFeed, 'new-feed')(sources)
  const busy = isolate(BusyIndicator, 'fetching')(sources)
  const feeds = isolate(Feeds, 'feeds')(sources)

  return {
    DOM: view(addFeed.DOM, busy.DOM, feeds.DOM),
    onion: addFeed.onion
  }
}

function view (...vtree) {
  return xs.combine.apply(null, vtree)
    .map(([addFeed, busy, feeds]) => (
      <div>
        <div className='uk-flex uk-flex-middle uk-padding-small uk-padding-remove-top uk-padding-remove-bottom'>
          {addFeed}{busy}
        </div>
        <div>
          {feeds}
        </div>
      </div>
    ))
}
