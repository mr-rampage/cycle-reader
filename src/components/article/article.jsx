export function ArticleModal (response) {
  return (
    <div attrs={{'uk-modal': true}}>
      <div className="uk-modal-dialog uk-modal-body">
        <h2 className="uk-modal-title"></h2>
        <button className="uk-modal-close" type="button"></button>
        <div innerHTML={response.body}></div>
      </div>
    </div>
  )
}
