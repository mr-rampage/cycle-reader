export function Article (feedItem) {
  return (
    <div>
      <div className="uk-card uk-card-default">
        <div className="uk-card-header">
          <h3 className="uk-card-title">{feedItem.title}</h3>
          <p className="uk-text-meta">{feedItem.date}</p>
        </div>
        <div className="uk-card-body" innerHTML={feedItem.description}>
        </div>
        <div className="uk-card-media-bottom" innerHTML={feedItem.thumbnail}>
        </div>
      </div>
    </div>
  )
}
