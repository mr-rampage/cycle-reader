const assets = [
  '/',
  '/index.html',
  '/styles/index.bundle.css',
  '/js/commons.js',
  '/js/index.bundle.js',
  '/cache.service-worker.js'
];

self.addEventListener('install', event =>
  event.waitUntil(
    caches.open('rx-reader')
      .then(cache => cache.addAll(assets))
  )
);

self.addEventListener('fetch', event =>
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  )
);
