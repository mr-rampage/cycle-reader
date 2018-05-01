onmessage = e => {
  console.log('message received', e.data)
  fetch(e.data.url, e.data.options)
    .then(response => response.json())
    .then(postMessage)
}
