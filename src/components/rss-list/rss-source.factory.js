import { proxied } from '../../domain/proxy-request'

export function fromUrl$ (HTTP, url$, responseCategory) {
  return {
    props: {
      feed$: url$
        .filter(url => url)
        .map(proxied)
        .map(url => ({href: url, category: responseCategory})),
      response$: HTTP.select(responseCategory).flatten()
    }
  }
}
