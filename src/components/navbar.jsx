export function NavBar () {
  return (
    <nav className="uk-navbar-container" uk-navbar>
      <div className="uk-navbar-left">
        <ul className="uk-navbar-nav">
          <li><a href="/">Articles</a></li>
          <li><a href="/settings">Settings</a></li>
          <li><a href="/subscriptions">Subscriptions</a></li>
        </ul>
      </div>
    </nav>
  )
}
