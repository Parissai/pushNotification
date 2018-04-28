'use strict';

self.addEventListener('push', function (event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push Codelab';
  const options = {
    body: 'Yay it works.',
    icon: '/icon.png',
    badge: '/badge.png',
    sound: "/alarm.mp3"
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
