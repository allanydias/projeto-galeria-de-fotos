const CACHE_NAME = 'galeria-pwa-v1';
const urlsToCache = [
  './index.html',
  './style.css',
  './app.js',
  './manifest.json'
];

//  armazena os arquivos principais no cache do navegador
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

//  intercepta as requisições para permitir funcionamento offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});