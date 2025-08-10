const CACHE_NAME = 'mywebapp-v2';
const urlsToCache = [
  '/',
  '/static/manifest.json',
  '/static/icon.svg'
];

// Установка service worker и кэширование ресурсов
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Кэш открыт');
        return cache.addAll(urlsToCache);
      })
  );
});

// Перехват запросов и возврат кэшированных ресурсов
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Возвращаем кэшированный ресурс, если он есть
        if (response) {
          return response;
        }
        
        // Иначе делаем сетевой запрос
        return fetch(event.request).then(
          function(response) {
            // Проверяем, что получили валидный ответ
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Клонируем ответ
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// Обновление кэша при активации
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Удаляем старый кэш:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
