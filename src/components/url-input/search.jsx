export function Search () {
  return (
    <form className="uk-search uk-search-large">
      <span attrs={{'uk-search-icon': true}}></span>
      <input className="uk-search-input" type="search" placeholder="Search"/>
    </form>
  )
}
