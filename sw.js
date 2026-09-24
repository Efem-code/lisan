/* Lisan service worker — lessons have to work on the bus, with no signal. */
/* BUILD is rewritten by phone.sh on every deploy. It has to change or the
   browser sees an identical service worker, keeps the old one, and the update
   never reaches the phone. */
const BUILD = '20260923-203119';
const CACHE = 'lisan-' + BUILD;
const SHELL = [
  './', './index.html', './styles.css',
  './alphabet.js', './courses.js',
  './course-ar.js', './course-ur.js', './course-es.js',
  './course-fr.js', './course-de.js', './course-ko.js',
  './lesson.js', './pron.js', './speech.js', './explain.js', './tts.js', './store.js', './app.js',
  './manifest.webmanifest', './icon-192.png', './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
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
    caches.match(req).then(hit => {
      const fresh = fetch(req).then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        }
        return res;
      }).catch(() => hit || caches.match('./index.html'));
      return hit || fresh;
    })
  );
});
