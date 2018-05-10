import 'babel-polyfill'

onmessage = e =>
  fetch(e.data.url, e.data.options)
    .then(response => response.json())
    .then(response => ({...response, request: e.data}))
    .then(postMessage)
