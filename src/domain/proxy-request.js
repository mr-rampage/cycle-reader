const proxyUrl = 'http://cors-proxy.htmldriven.com/?url='

export function proxied (url) {
  return proxyUrl + url
}
