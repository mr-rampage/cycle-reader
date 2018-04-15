export function Article (feedItem) {
  return (
    <div className="uk-card uk-card-default uk-grid-collapse uk-margin-large uk-padding-small" attrs={{'uk-grid': true}}>
      <div className="uk-card-media-left uk-cover-container uk-width-1-3@s">
        <span innerHTML={feedItem.thumbnail} attrs={{'uk-cover': true}}></span>
      </div>
      <div className="uk-card-body uk-width-expand@m">
        <h3 className="uk-card-title">{feedItem.title}</h3>
        <p className="uk-text-meta">{feedItem.date}</p>
        <p innerHTML={feedItem.description}></p>
      </div>
    </div>
  )
}
