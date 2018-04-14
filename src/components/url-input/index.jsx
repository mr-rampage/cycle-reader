import { ValidMarker } from '../valid-marker/index'
import xs from 'xstream'

const onUrlInput = sources => sources.DOM
  .select('.uk-search-input')
  .events('input')
  .map(event => event.target.value)

const isUrl = new RegExp('^(https?|ftp):\\/\\/[^\\s/$.?#].[^\\s]*$', 'i')

const validUrls = intent$ => intent$
  .filter(input => isUrl.test(input))
  .startWith('')

const urlValidity = intent$ => intent$
  .map(input => isUrl.test(input))

export function UrlInput (sources) {
  const indicatorVDom$ = ValidMarker({props: urlValidity(onUrlInput(sources))})

  const render = model$ => xs.combine(model$, indicatorVDom$.DOM)
    .map(([url, indicatorVDom]) =>
      <form className="uk-search uk-search-large">
        <span uk-search-icon></span>
        <input className="uk-search-input" type="search" placeholder="Search"/>
        {indicatorVDom}
      </form>
    )

  const url$ = validUrls(onUrlInput(sources))

  return {
    DOM: render(url$),
    value: url$
  }
}
