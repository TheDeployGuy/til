// @ts-check
// If you change something in your app (html, css etc) you need to update your service worker cache version...
const STATIC_CACHE_NAME = "static-v1";

// As soon as our sw file receives the "install" event we cache the app-shell.
self.addEventListener("install", event => {
  console.log("[Service worker] Installing SW...", event);
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(cache => {
      console.log("[Service worker] Pre-caching app-shell...");
      // Note: We need to store exact requests your app is making, e.g caching '/' is important, think of these as requests not files.
      cache.addAll([
        // Cache the route of our application as that is what most people request, this is more than likely the index.html file but it doesn't have to be.
        "/",
        // Cache our main JS file
        "/src/index.js",
        // Cache our main index.html file, if we had other html files we could also cache them here.
        "index.html",
        // Cache our main index.css file
        "index.css",
        // Cache our manifest.json file TBA...
        "manifest.json"
      ]);
    })
  );
});

// Only gets activated when the user closes all tabs and pages and opens up a new one, so it is the perfect place to cleanup old caches.
self.addEventListener("activate", event => {
  console.log("[Service Worker] Activating SW...", event);
  event.waitUntil(
    // This returns us the names of all the caches the browser has stored.
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== STATIC_CACHE_NAME) {
            console.log("[Service worker] Removing old cache.", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  // Ensure SW are processed correctly as sometimes they behave weird.
  return self.clients.claim();
});

// The next time they visit our website, the service worker will intercept the fetch event for the site resources and if the file is found in the cache we serve that file, if we do not have the file in the cache we try fetch it. (e.g we just allow the request to pass through). This also means we need to now worry about version and cache invalidation if any of html files or anything like that.
self.addEventListener("fetch", event => {
  console.log("[Service worker] Fetching something...", event);
  // Overwrite the fetch request.
  event.respondWith(
    // Urls are the keys to cache and event.request is the url (this looks in all caches so we need to cleanup old caches...or we could end up serving old cache files.)
    caches.match(event.request).then(res => {
      // If it is cached get the cache version. otherwise try fetch it
      if (res) {
        return res;
      } else {
        return fetch(event.request).catch(e => {
          // Do nothing for errors for now...
        });
      }
    })
  );
});
