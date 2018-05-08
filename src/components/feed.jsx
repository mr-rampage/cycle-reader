import { Article } from './article'

export function Feed (feed) {
  return <div className="uk-padding">{feed.map(Article)}</div>
}
