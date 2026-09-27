// Bump VERSION whenever you change any file, so returning visitors get the update.
const VERSION = 'discovr-v1';
const FILES = [
  './',
  'index.html',
  'manifest.webmanifest',
  'favicon.svg',
  'discovr-wordmark-bone.svg',
  'fonts/instrument-sans-latin-400-normal.woff2',
  'fonts/instrument-sans-latin-600-normal.woff2',
  'fonts/instrument-sans-latin-700-normal.woff2',
  'icons/favicon-32.png',
  'icons/apple-touch-icon.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-192.png',
  'icons/icon-maskable-512.png',
  'icons/discovr-app-icon.svg',
  'icons/discovr-app-icon-maskable.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  // Pages: network first so edits show up, cache when offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put('index.html', copy)); return res; })
        .catch(() => caches.match('index.html'))
    );
    return;
  }

  // Everything else: cache first.
  event.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});
