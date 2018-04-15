import { Article } from './article'

export function Feed (feed) {
  return <div className="uk-child-width-1-2@m">{feed.map(Article)}</div>
}
