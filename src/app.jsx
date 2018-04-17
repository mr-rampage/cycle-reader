import { UrlInput } from './components/url-input'
import xs from 'xstream'
import { RssList } from './components/rss-list'
import * as RssSources from './components/rss-list/rss-source.factory'

export function main (sources) {
  const urlSink = UrlInput(sources.DOM)

  const rssSources = RssSources.fromUrl$({...sources, url$: urlSink.value}, 'rss')
  const rssSink = RssList(rssSources)

  const vdom$ = xs.combine(urlSink.DOM, rssSink.DOM)
    .map(([urlInput, rssList]) =>
      <div>
        {urlInput}
        {rssList}
      </div>
    )

  return {
    DOM: vdom$,
    HTTP: rssSink.HTTP
  }
}
