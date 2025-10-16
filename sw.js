const CACHE_NAME = "emma-grace-lifestyle-v1"; // Change version when updating
const OFFLINE_URL = "/offline.html"; // Fallback page

// List of files to cache
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/offline.html",
  "assets/android-chrome-192x192.png",
  "assets/android-chrome-512x512.png"
];

// Install event — cache all essential files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event — cleanup old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch event — serve from cache first, then network fallback
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).catch(() => caches.match(OFFLINE_URL))
      );
    })
  );
});
