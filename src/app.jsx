import { AddFeed } from './components/add-feed'
import xs from 'xstream'
import isolate from '@cycle/isolate'
import { ArticleList } from './components/article-list'
import { proxied } from './domain/proxy-request'
import { ARTICLE_DB, FEED_DB } from './index'
import { FeedRepository } from './components/feed-repository'

export function main (sources) {
  const addFeed = isolate(AddFeed, 'new-feed')({...sources, props: { category: 'rss' }})
  const articleList = isolate(ArticleList, 'feed-list')({...sources, props: { db: ARTICLE_DB }})

  const persistFeed = isolate(FeedRepository, 'new-feed')({...sources, props: { feedDb: FEED_DB, articlesDb: ARTICLE_DB }})

  return {
    DOM: view(addFeed.DOM, articleList.DOM),
    FETCH: proxy(addFeed.FETCH, articleList.FETCH),
    IDB: persistFeed.IDB,
    onion: xs.merge(addFeed.onion, articleList.onion)
  }
}

function proxy (...fetches) {
  return xs.merge.apply(null, fetches)
    .map(request => ({...request, url: proxied(request.uri), href: request.uri, options: {mode: 'cors'}}))
}

function view (...vtrees) {
  return xs.combine.apply(null, vtrees)
    .map(vdoms =>
      <div>
        {vdoms}
      </div>
    )
}
