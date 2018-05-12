export function SettingsMenu (config) {
  return (
    <form>
      <div className="uk-margin">
        <input className="uk-input" type="text" placeholder="profile" name="profile" value={config.profile} />
        <input className="uk-input" type="text" placeholder="proxy" name="proxy" value={config.proxy} />
      </div>
    </form>
  )
}
