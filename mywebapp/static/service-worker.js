const CACHE_NAME = 'math-practice-v1.2';
const urlsToCache = [
  '/',
  '/static/icon.svg',
  '/manifest.json',
  '/service-worker.js'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  // Navigation requests (the HTML page itself) always go to the network
  // first, so a new deploy shows up right away instead of being stuck
  // behind a stale cached page. Falls back to cache only when offline.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
        })
      ))
      .then(() => self.clients.claim())
  );
});
