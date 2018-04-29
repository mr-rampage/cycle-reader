let timeout

onmessage = e => {
  if (timeout) {
    clearTimeout(timeout)
  } else {
    postMessage(e.data)
  }

  timeout = setTimeout(function () {
    postMessage(e.data)
    onmessage(e)
  }, 900000)
}
