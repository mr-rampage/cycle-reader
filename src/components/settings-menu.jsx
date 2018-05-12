export function SettingsMenu (config) {
  return (
    <form>
      <div className="uk-margin">
        <input className="uk-input" type="text" placeholder="proxy" value={config.proxy} />
      </div>
    </form>
  )
}
