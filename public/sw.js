// Basic offline-first service worker
const CACHE_NAME = 'app-cache-v1'
const ASSETS = [
  '/',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return
  event.respondWith(
    caches.match(req).then((res) => res || fetch(req).then((net) => {
      const copy = net.clone()
      caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {})
      return net
    }).catch(() => res))
  )
})

