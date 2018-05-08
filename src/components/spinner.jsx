export function Spinner (state) {
  return (
    <span attrs={{'uk-spinner': state ? 'ratio: 1.5' : false}}></span>
  )
}
