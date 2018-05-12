export function Article ({source, title, isoDate, description, thumbnail, link}) {
  return (
    <div className="uk-card uk-card-default uk-grid-collapse uk-margin-medium uk-padding-small" attrs={{'uk-grid': true, 'href': link}}>
      <div className="uk-card-media-left uk-cover-container uk-width-1-3@m" attrs={{'hidden': !thumbnail}}>
        <img src={thumbnail} attrs={{'uk-cover': true}} />
        <canvas width="200" height="300"></canvas>
      </div>
      <div className="uk-card-body uk-width-expand@s">
        <div className="uk-card-badge uk-label">{source}</div>
        <h3 className="uk-card-title">{title}</h3>
        <p className="uk-text-meta">{isoDate}</p>
        <p>{description}</p>
      </div>
    </div>
  )
}
