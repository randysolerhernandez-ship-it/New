const CACHE_NAME = "eythanboll-v1";

const ARCHIVOS = [
    "./",
    "./index.html",
    "./manifest.json",
    "./icon-192.png",
    "./sw.js"
];

self.addEventListener("install", function(event) {

    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(ARCHIVOS);
        })
    );

    self.skipWaiting();
});

self.addEventListener("activate", function(event) {

    event.waitUntil(
        caches.keys().then(function(nombres) {

            return Promise.all(
                nombres
                .filter(function(nombre) {
                    return nombre !== CACHE_NAME;
                })
                .map(function(nombre) {
                    return caches.delete(nombre);
                })
            );

        })
    );

    self.clients.claim();
});

self.addEventListener("fetch", function(event) {

    event.respondWith(

        caches.match(event.request)
        .then(function(respuesta) {

            if (respuesta) {
                return respuesta;
            }

            return fetch(event.request);
        })

    );

});