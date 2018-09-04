// indichiamo le risorse per l'AppShell
var STATIC_CACHE_NAME = 'static-v1';
// indichiamo le risorse non necessarie al primo caricamento
// quindi al di fuori dell'AppShell
var DYNAMIC_CACHE_NAME = 'dynamic-v1';

self.addEventListener('install', function (event) {
    event.respondWith(
        caches.open(STATIC_CACHE_NAME)
            .then(function (cache) {
                cache.addAll([
                    '/',
                    '/index.html',
                    '/src/css/app.css',
                    '/src/css/main.css',
                    'https://fonts.googleapis.com/css?family=Roboto:400,700',
                    'https://fonts.googleapis.com/icon?family=Material+Icons',
                    'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
                ])
            })
    )
});

self.addEventListener('activate', function (event) {
    return self.clients.claim();
});

self.addEventListener('fetch',function (event) {
    event.respondWith(
        caches.match(event.request.url)
            .then(function (res) {
                if (res) {
                  return res;
                } else {
                  return fetch(event.request)
                      .then(function (response) {
                          caches.open(DYNAMIC_CACHE_NAME)
                              .then(function (data) {
                                  cache.put(event.request.url,data.clone());
                                  return data;
                              })
                      })
                }
            })
    )
});