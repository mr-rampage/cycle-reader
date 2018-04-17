import { proxied } from '../../domain/proxy-request'
import xs from 'xstream'

export function fromUrl$ ({HTTP, url$}, responseCategory) {
  return {
    props: {
      category$: xs.of(responseCategory),
      feed$: url$
        .filter(url => url)
        .map(proxied),
      response$: HTTP.select(responseCategory).flatten()
    }
  }
}
