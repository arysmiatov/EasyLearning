const CACHE_NAME = 'math-practice-v1.1';
const urlsToCache = [
  '/',
  '/static/icon.svg',
  '/manifest.json',
  '/service-worker.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Для HTML страниц всегда загружаем свежую версию
        if (event.request.url.includes('/') && !event.request.url.includes('.')) {
          return fetch(event.request);
        }
        // Для остальных файлов используем кеш, но с проверкой обновлений
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
