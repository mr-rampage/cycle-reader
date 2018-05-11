import 'whatwg-fetch'
import 'serviceworker-cache-polyfill'

const CACHE_VERSION = 1

const CURRENT_CACHES = {
  site: 'site-cache-v' + CACHE_VERSION,
  images: 'image-cache-v' + CACHE_VERSION
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CURRENT_CACHES.site)
      .then(cache => cache.addAll(global.serviceWorkerOption.assets))
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request)
    .then(response => {
      if (response !== undefined) {
        return response
      } else {
        return fetch(event.request)
          .then(cacheImages.bind(null, event.request))
      }
    }))
})

function cacheImages (request, response) {
  if (request.destination === 'image') {
    const cloned = response.clone()
    caches
      .open(CURRENT_CACHES.images)
      .then(cache => cache.put(request, cloned))
  }

  return response
}
