const CACHE_NAME = "pwa-softavant-v1";
const OFFLINE_URL = "./offline.html";

const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./offline.html",
  "./manifest.json",
  "./error/404.html",
  "./legal/privacidad.html",
  "./build/css/app.min.css",
  "./build/js/bundle.min.js",
  "./build/img/icons/icon-192.png",
  "./build/img/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then((res) => {
        if (res) return res;
        if (event.request.headers.get("accept").includes("text/html")) {
          return caches.match(OFFLINE_URL);
        }
      })
    )
  );
});
