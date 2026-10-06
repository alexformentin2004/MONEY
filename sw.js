const CACHE='alex.money.shell.v0.1.0';
const ASSETS=[
  './','./index.html','./manifest.webmanifest','./css/styles.css',
  './assets/icon-192.png','./assets/icon-512.png','./assets/apple-touch-icon.png',
  './js/ui/app.js','./js/ui/charts.js',
  './js/core/constants.js','./js/core/date.js','./js/core/money.js','./js/core/recurrence.js','./js/core/analytics.js','./js/core/schema.js',
  './js/storage/db.js','./js/storage/repository.js','./js/services/integration.js','./js/services/backup.js'
];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('alex.money.shell.')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin) return;
  if(event.request.mode==='navigate') {
    event.respondWith(fetch(event.request).catch(()=>caches.match('./index.html')));return;
  }
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
});
