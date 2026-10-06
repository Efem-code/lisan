/* Lisan service worker — lessons have to work on the bus, with no signal. */
/* BUILD is rewritten by phone.sh on every deploy. It has to change or the
   browser sees an identical service worker, keeps the old one, and the update
   never reaches the phone. */
const BUILD = '20261005-205629';
const PREFIX = 'lisan-';
const CACHE = PREFIX + BUILD;
const SHELL = [
  './', './index.html', './styles.css',
  './alphabet.js', './courses.js',
  './course-ar.js', './course-ur.js', './course-es.js',
  './course-fr.js', './course-de.js', './course-ko.js',
  './lesson.js', './pron.js', './speech.js', './explain.js', './tts.js', './store.js', './app.js',
  './manifest.webmanifest', './icon-192.png', './icon-512.png'
];

self.addEventListener('install', e => {
  /* cache: 'reload' skips the browser's HTTP cache (GitHub Pages sends
     max-age=600). Every file must come back 200: an error page from a
     half-published deploy would be cached for good, so a bad response fails
     the install and the browser retries next launch. */
  e.waitUntil(caches.open(CACHE)
    .then(c => Promise.all(SHELL.map(u => fetch(u, { cache: 'reload' }).then(r => {
      if (!r.ok) throw new Error(u + ' -> ' + r.status);
      return c.put(u, r);
    }))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  /* Every app lives on the same origin (efem-code.github.io), so they share
     one CacheStorage. Only clear this app's old builds, never another app's. */
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith(PREFIX) && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== location.origin) return;

  /* Stale-while-revalidate: answer instantly from cache so a lesson never
     stalls, but always refetch in the background so a redeploy lands on the
     next launch. Pure cache-first would pin the phone to whatever version was
     installed first until the cache name changed. */
  e.respondWith(
    caches.match(req, { cacheName: CACHE }).then(hit => {
      const fresh = fetch(req).then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        }
        return res;
      }).catch(() => hit || caches.match('./index.html', { cacheName: CACHE }));
      return hit || fresh;
    })
  );
});
