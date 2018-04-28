'use strict';

let swRegistration = null;

if ('serviceWorker' in navigator && 'PushManager' in window) { //check if service workers & push messaging is supported by the current browser. If it is, register sw.js
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('sw.js')
    .then(function (swReg) {
      console.log('Service Worker is registered', swReg);

      swRegistration = swReg; // sw registration obj
    })
    .catch(function (error) {
      console.error('Service Worker Error', error);
    });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}
