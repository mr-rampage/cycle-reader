let timeout

onmessage = e => {
  if (timeout) {
    clearTimeout(timeout)
  }
  postMessage(e.data)
  timeout = setTimeout(onmessage.bind(null, e), 900000)
}
