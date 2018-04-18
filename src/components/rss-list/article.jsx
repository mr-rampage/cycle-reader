export function Article ({source, title, created, description, thumbnail}) {
  return (
    <div className="uk-card uk-card-default uk-grid-collapse uk-margin-large uk-padding-small" attrs={{'uk-grid': true}}>
      <div className="uk-card-media-left uk-cover-container uk-width-1-3@s">
        <span innerHTML={thumbnail} attrs={{'uk-cover': true}}></span>
      </div>
      <div className="uk-card-body uk-width-expand@m">
        <div className="uk-card-badge uk-label">{source}</div>
        <h3 className="uk-card-title">{title}</h3>
        <p className="uk-text-meta">{created}</p>
        <p innerHTML={description}></p>
      </div>
    </div>
  )
}
