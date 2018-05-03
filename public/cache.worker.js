const CACHE_VERSION = 1

const CURRENT_CACHES = {
  site: 'site-cache-v' + CACHE_VERSION,
  images: 'image-cache-v' + CACHE_VERSION
}

const urlsToCache = [
  '/cache.worker.js',
  '/styles.css',
  '/vendor.js'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CURRENT_CACHES.site)
      .then(cache => cache.addAll(urlsToCache))
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request)
    .then(response => {
      if (response !== undefined) {
        return response
      } else {
        return fetch(event.request)
          .then(response => {
            if (event.request.destination === 'image') {
              const cloned = response.clone()
              caches
                .open(CURRENT_CACHES.images)
                .then(cache => cache.put(event.request, cloned))
            }
            return response
          })
      }
    }))
})