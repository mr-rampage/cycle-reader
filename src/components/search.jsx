export function Search () {
  return (
    <form className="uk-search uk-search-large uk-width-1-1 uk-flex uk-flex-middle uk-padding-small uk-padding-remove-top uk-padding-remove-bottom">
      <span attrs={{'uk-search-icon': true}}></span>
      <input className="uk-search-input" type="search" placeholder="Search" value="http://"/>
      <span attrs={{'uk-spinner': true}}></span>
    </form>
  )
}
