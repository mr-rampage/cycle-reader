import 'whatwg-fetch'

onmessage = e =>
  fetch(e.data.url, e.data.options)
    .then(deserializeResponse)
    .then(adaptResponseBody.bind(null, e.data))
    .then(postMessage)

function deserializeResponse (response) {
  let contentType = response.headers.get('content-type')
  if (/application\/json/.test(contentType)) {
    return response.json()
  } else {
    return response.text()
  }
}

function adaptResponseBody (request, response) {
  return {
    body: response.body || response,
    request
  }
}
