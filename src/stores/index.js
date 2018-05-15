import xs from 'xstream'
import isolate from '@cycle/isolate'
import FeedStore from './feed-store'
import SettingsStore from './settings-store'

export default function Stores (sources) {
  const settingsStore = isolate(SettingsStore, 'settings')(sources)
  const feedStore = FeedStore(sources)

  return {
    IDB: xs.merge(feedStore.IDB, settingsStore.IDB),
    onion: xs.merge(feedStore.onion, settingsStore.onion)
  }
}
