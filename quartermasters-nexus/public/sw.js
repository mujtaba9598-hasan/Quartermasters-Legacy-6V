/**
 * Quartermasters Service Worker
 * ==============================
 * Cache-first for static assets, network-first for API/pages.
 * Provides offline fallback and faster repeat visits.
 */

const CACHE_VERSION = "qm-v1";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const PAGES_CACHE = `${CACHE_VERSION}-pages`;

const STATIC_ASSETS = [
    "/",
    "/manifest.json",
    "/quartermasters-logo-monogram.png",
    "/logo.png",
];

// Install: pre-cache static shell
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS))
    );
    self.skipWaiting();
});

// Activate: purge old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((k) => k.startsWith("qm-") && k !== STATIC_CACHE && k !== PAGES_CACHE)
                    .map((k) => caches.delete(k))
            )
        )
    );
    self.clients.claim();
});

// Fetch strategy
self.addEventListener("fetch", (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET and cross-origin
    if (request.method !== "GET" || url.origin !== self.location.origin) return;

    // API routes: network-only (never cache API responses)
    if (url.pathname.startsWith("/api/")) return;

    // Static assets (images, fonts, CSS, JS bundles): cache-first
    if (
        url.pathname.match(/\.(png|jpg|jpeg|webp|avif|svg|woff2?|ttf|css|js)$/) ||
        url.pathname.startsWith("/_next/static/")
    ) {
        event.respondWith(
            caches.match(request).then(
                (cached) =>
                    cached ||
                    fetch(request).then((response) => {
                        if (response.ok) {
                            const clone = response.clone();
                            caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
                        }
                        return response;
                    })
            )
        );
        return;
    }

    // Pages: network-first with cache fallback
    event.respondWith(
        fetch(request)
            .then((response) => {
                if (response.ok) {
                    const clone = response.clone();
                    caches.open(PAGES_CACHE).then((cache) => cache.put(request, clone));
                }
                return response;
            })
            .catch(() => caches.match(request).then((cached) => cached || caches.match("/")))
    );
});
