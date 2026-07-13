const CACHE_NAME = 'hre4m-hub-v6';
const APP_ROUTES = [
  './',
  './teacher/',
  './privacy/',
  './unit-2/john/',
  './unit-2/mark/',
  './unit-2/matthew/',
  './unit-2/luke/',
  './manifest.webmanifest',
  './app-icon.png',
  './og.png',
  './media/cana-jars-observation.svg',
  './media/cana-sign-motion.mp4',
  './media/cana-sign-poster.png',
  './media/four-senses-motion.mp4',
  './media/four-senses-poster.png',
  './media/exegesis-eisegesis-motion.mp4',
  './media/exegesis-eisegesis-poster.png',
  './media/john1-word-light-hook.svg',
  './media/john1-prologue-pattern.svg',
  './media/john6-bread-sign-hook.svg',
  './media/john6-bread-of-life-map.svg',
  './media/john9-sight-hook.svg',
  './media/john9-sight-testimony-map.svg',
];

self.addEventListener('install', (event) => {
  const urls = APP_ROUTES.map((path) => new URL(path, self.registration.scope).href);
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urls)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith('hre4m-hub-') && key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(async () => (await caches.match(request)) || caches.match(new URL('./', self.registration.scope))),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request).then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        }),
    ),
  );
});
