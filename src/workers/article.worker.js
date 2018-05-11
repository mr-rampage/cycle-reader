import 'whatwg-fetch'

onmessage = e =>
  fetch(e.data.url, e.data.options)
    .then(response => response.text())
    .then(response => ({body: response, request: e.data}))
    .then(postMessage)
