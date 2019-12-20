// @ts-check
// When we update a service worker for it to pick up a new version we need to increment the version number.
const STATIC_CACHE_NAME = "static-v1";

// As soon as our sw file receives the "install" event we cache the app-shell.
self.addEventListener("install", event => {
  console.log("[Service worker] Installing SW...", event);
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(cache => {
      console.log("[Service worker] Pre-caching app-shell");
      cache.addAll(["/", "/src/index.js", "index.html", "index.css"]);
    })
  );
});

// The next time they visit our website, the service worker will intercept the fetch event for the site resources and if the file is found in the cache we serve that file, if we do not have the file in the cache we try fetch it. (e.g we just allow the request to pass through). This also means we need to now worry about version and cache invalidation...(TODO)
self.addEventListener("fetch", event => {
  console.log("[Service worker] Fetching something...", event);
  // Overwrite the fetch request.
  event.respondWith(
    // Urls are the keys to cache and event.request is the url
    caches.match(event.request).then(res => {
      // If it is cached get the cache version. otherwise try fetch it
      if (res) {
        return res;
      } else {
        return fetch(event.request);
      }
    })
  );
});
