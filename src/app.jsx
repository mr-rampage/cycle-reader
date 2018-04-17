import { UrlInput } from './components/url-input'
import xs from 'xstream'
import { RssList } from './components/rss-list'
import * as RssSources from './components/rss-list/rss-source.factory'

export function main (sources) {
  const urlSource = UrlInput(sources.DOM)

  const rssSources = RssSources.fromUrl$(sources.HTTP, urlSource.value, 'rss')
  const rssSink = RssList(rssSources)

  const vDom$ = xs.combine(urlSource.DOM, rssSink.DOM)
    .map(([urlInput, rssList]) =>
      <div>
        {urlInput}
        {rssList}
      </div>
    )

  return {
    DOM: vDom$,
    HTTP: rssSink.HTTP
  }
}
