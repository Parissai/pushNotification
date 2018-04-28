'use strict';
const applicationServerPublicKey = 'BGra8OcX9oZHgVKNaeTH-6CXckh3nVIT-DJ_PD216Ml4hG5EXj3dO_YfWCcYQnJmkCQ-dtjCdZO-G3QOznDi9Kc';

const pushButton = document.querySelector('.js-push-btn');

let swRegistration = null;
let isSubscribed = false;

function urlB64ToUint8Array(base64String) {  // convert base 64 URL safe encoded to a UInt8Array
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

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
  if (Notification.permission === 'denied') { // web app will not be able to re-show the permission prompt and will not be able to subscribe the user
    pushButton.textContent = 'Push Messaging Blocked.';
    pushButton.disabled = true; // disable the button because permission is denied & user can't be subscribed
    updateSubscriptionOnServer(null);
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}

function updateSubscriptionOnServer(subscription) { // NOT HERE send subscription to a backend
  // TODO: Send subscription to application server
  console.log('SUBSCRIPTION: ', subscription);

  const subscriptionJson = document.querySelector('.js-subscription-json');
  const subscriptionDetails =
    document.querySelector('.js-subscription-details');

  if (subscription) {
    subscriptionJson.textContent = JSON.stringify(subscription);
    subscriptionDetails.classList.remove('is-invisible');
  } else {
    subscriptionDetails.classList.add('is-invisible');
  }
}

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey); // convert application server's public key, from base 64 URL safe encoded to a UInt8Array
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true, // every time a push is sent, will show a notification 
    applicationServerKey
  })
    .then(function (subscription) {
      console.log('User is subscribed.');

      updateSubscriptionOnServer(subscription);

      isSubscribed = true;

      updateBtn();  // re enable the button
    })
    .catch(function (err) {
      console.log('Failed to subscribe the user: ', err);
      updateBtn();  // re enable the button
    });
}

function initializeUI() {

  pushButton.addEventListener('click', function () { // toggle user subscription 
    pushButton.disabled = true; // disable button so user can't click for the second time
    if (isSubscribed) {
      // unsubscribeUser();
    } else {
      subscribeUser();
    }
  });

  swRegistration.pushManager.getSubscription() // check if the user is currently subscribed..pushManager.getSubscription() return a Promise that resolves to a PushSubscription object containing details of an existing subscription
    .then(function (subscription) {
      isSubscribed = !(subscription === null);

      updateSubscriptionOnServer(subscription);

      if (isSubscribed) {
        console.log('User IS subscribed.');
      } else {
        console.log('User is NOT subscribed.');
      }

      updateBtn();
    });
}
