import isolate from '@cycle/isolate'
import Settings from './settings'

export default function SettingsPage (sources) {
  const settings = isolate(Settings, 'settings')(sources)

  return {
    ...settings
  }
}
