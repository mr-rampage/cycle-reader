const proxyUrl = 'http://localhost:8080/'

export function proxied (url) {
  return proxyUrl + url
}
