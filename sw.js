const STATIC_CACHE_NAME = "static-v3";

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
