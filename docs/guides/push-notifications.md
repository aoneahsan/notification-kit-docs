---
title: Push notifications
description: Request permission, get the device token, handle topics, and receive push messages with notification-kit.
sidebar_position: 1
---

# Push notifications

Push notifications flow through the configured provider (Firebase or OneSignal). notification-kit standardizes the permission, token, subscription, and receive flow so the same code runs on Web, iOS, and Android.

## Permission and token

```ts
import { notifications } from 'notification-kit';

const granted = await notifications.requestPermission();
if (!granted) return;

const token = await notifications.getToken();
// Persist the token on YOUR backend, keyed to the user/device.
```

`requestPermission()` runs the provider's permission flow and returns a boolean. `getToken()` returns the device token. Both throw if the kit is not initialized.

To check the current state without prompting:

```ts
const status = await notifications.checkPermission();
// 'granted' | 'denied' | 'prompt' | 'provisional' | 'default' | 'unknown'

const isOn = await notifications.isPermissionGranted();
```

## Receiving messages

```ts
const off = notifications.onPush((notification) => {
  // foreground push received
});

notifications.onPushOpened((notification) => {
  // notification tapped / action performed — route from notification.data
});

off(); // stop listening
```

`onPush` filters to push notifications only; local notifications surface through the `notificationReceived` event (see the [Events guide](/guides/events)).

## Token refresh

The provider emits a refreshed token when the platform rotates it. Listen and update your backend:

```ts
notifications.on('tokenRefreshed', (event) => {
  syncTokenToBackend(event.token);
});
```

## Topics

```ts
await notifications.subscribe('news');
await notifications.unsubscribe('news');
```

:::warning Firebase topics are server-side
With the **Firebase** provider, `subscribe()` / `unsubscribe()` throw a descriptive error on purpose: FCM topic management is a privileged operation that requires the Firebase Admin SDK or the IID API and cannot run from client code. Send the device token from `getToken()` to your backend and (un)subscribe it there.

The **OneSignal** provider handles audience targeting through tags and segments — see the [OneSignal page](/providers/onesignal).
:::

## Sending push

notification-kit does **not** send push notifications from the client. With Firebase, `provider.sendNotification()` throws — sending is a server-side Admin-SDK operation. Send from your backend:

```ts
// Server-side (Node, Firebase Admin SDK)
import admin from 'firebase-admin';
await admin.messaging().send({
  token: deviceToken,
  notification: { title: 'Hello', body: 'World' },
});
```

See the [capacitor-push-notifications guidance](/platforms/android) for native channel and priority options on the server payload.

## Related

- [Permissions](/guides/permissions)
- [Events](/guides/events)
- [Firebase provider](/providers/firebase) · [OneSignal provider](/providers/onesignal)
