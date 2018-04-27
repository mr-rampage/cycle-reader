import { Article } from './article'

export function Feed (feed) {
  return <div className="uk-padding">{feed.sort(byIndex).map(Article)}</div>
}

function byIndex (a, b) {
  return b.index - a.index
}
