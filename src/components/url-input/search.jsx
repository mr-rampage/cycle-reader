export function Search () {
  return (
    <form className="uk-search uk-search-large uk-width-1-1">
      <span attrs={{'uk-search-icon': true}}></span>
      <input className="uk-search-input" type="search" placeholder="Search" value="http://"/>
    </form>
  )
}
