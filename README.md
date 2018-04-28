# pushNotification

- run [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb) 
- choose folder 
- check "Automatically show index.html" checkbox
- slide the toggle "Web Server: STARTED"
- go to "Web Server URL" link

devTools > application > Service Workers > during development check "Update on Reload" checkbox

## resources 

__*[PushManager.subscribe()](https://developer.mozilla.org/en-US/docs/Web/API/PushManager/subscribe)*__ returns a Promise that resolves to a PushSubscription object containing details of a push subscription. A new push subscription is created if the current service worker does not have an existing subscription.
```js
​PushManager.subscribe(options).then(function(pushSubscription) { ... } );
```
**Parameters:**

**options** (optional)

An object containing optional configuration parameters. It can have the following properties:

- **userVisibleOnly:** A boolean indicating that the returned push subscription will only be used for messages whose effect is made visible to the user.

- **applicationServerKey:** A Base64-encoded DOMString or ArrayBuffer containing an ECDSA P-256 public key that the push server will use to authenticate your application server. If specified, all messages from your application server must use the VAPID authentication scheme, and include a JWT signed with the corresponding private key. This key IS NOT the same ECDH key that you use to encrypt the data. For more information, see "Using VAPID with WebPush".

__*[PushManager.getSubscription()](https://developer.mozilla.org/en-US/docs/Web/API/PushManager/getSubscription)*__ method of the PushManager interface retrieves an existing push subscription. It returns a Promise that resolves to a PushSubscription object containing details of an existing subscription. If no existing subscription exists, this resolves to a null value.


__*[Notification.Notification()](https://developer.mozilla.org/en-US/docs/Web/API/notification/Notification)*__