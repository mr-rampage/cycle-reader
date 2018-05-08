import { AddFeed } from './containers/add-feed'
import xs from 'xstream'
import isolate from '@cycle/isolate'
import { ArticleList } from './containers/article-list'
import { proxied } from './domain/proxy-request'
import { ARTICLE_DB, FEED_DB } from './index'
import { FeedRepository } from './containers/feed-repository'
import { FetchIndicator } from './containers/fetch-indicator'

export function main (sources) {
  const addFeed = isolate(AddFeed, 'new-feed')(sources)
  const articleList = isolate(ArticleList, 'feed-list')(sources)

  const persistFeed = FeedRepository({...sources, props: { feedDb: FEED_DB, articlesDb: ARTICLE_DB }})
  const spinner = FetchIndicator(sources)

  sources.onion.state$.addListener({next: console.info})

  return {
    DOM: view(spinner.DOM, addFeed.DOM, articleList.DOM),
    FETCH: proxy(spinner.FETCH),
    IDB: persistFeed.IDB,
    onion: xs.merge(addFeed.onion, articleList.onion, spinner.onion, persistFeed.onion)
  }
}

function proxy (...fetches) {
  return xs.merge.apply(null, fetches)
    .map(request => ({...request, url: proxied(request.uri), options: {mode: 'cors'}}))
}

function view (spinner, addFeed, list) {
  return xs.combine(spinner, addFeed, list)
    .map(([spinner, addFeed, list]) =>
      <div>
        <div className='uk-flex uk-flex-middle uk-padding-small uk-padding-remove-top uk-padding-remove-bottom'>
          {addFeed}{spinner}
        </div>
        {list}
      </div>
    )
}
