export function ProxyRequest ([request, settings]) {
  const options = {
    mode: 'cors',
    headers: {
      'ACCEPT': 'text/xml'
    }
  }
  return {...request, url: `${settings.proxy}${request.uri}`, options}
}
