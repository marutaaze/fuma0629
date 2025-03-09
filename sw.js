const CACHE_NAME = "rpg-game-cache-v2";
const urlsToCache = [
  "./",
  "./index.html",
  "./Content/Datas/Scripts/System/main.js",
  "./Content/Styles/fonts.css",
  "./assets/tilesets/mytileset.png"
];

// 安裝 Service Worker 並快取
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 攔截請求，先從快取讀取
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// 更新快取
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});
