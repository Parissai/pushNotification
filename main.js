'use strict';
const applicationServerPublicKey = 'BGra8OcX9oZHgVKNaeTH-6CXckh3nVIT-DJ_PD216Ml4hG5EXj3dO_YfWCcYQnJmkCQ-dtjCdZO-G3QOznDi9Kc';

const pushButton = document.querySelector('.js-push-btn');

let swRegistration = null;
let isSubscribed = false;

if ('serviceWorker' in navigator && 'PushManager' in window) { //check if service workers & push messaging is supported by the current browser. If it is, register sw.js
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('sw.js')
    .then(function (swReg) {
      console.log('Service Worker is registered', swReg);

      swRegistration = swReg; // sw registration obj
      initializeUI();
    })
    .catch(function (error) {
      console.error('Service Worker Error', error);
    });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}

function updateBtn() {
  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}

function initializeUI() {
  swRegistration.pushManager.getSubscription() // check if the user is currently subscribed..pushManager.getSubscription() return a Promise that resolves to a PushSubscription object containing details of an existing subscription
    .then(function (subscription) {
      isSubscribed = !(subscription === null);

      if (isSubscribed) {
        console.log('User IS subscribed.');
      } else {
        console.log('User is NOT subscribed.');
      }

      updateBtn();
    });
}
