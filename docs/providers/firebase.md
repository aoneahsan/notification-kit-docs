---
title: Firebase provider
description: Configure notification-kit with Firebase Cloud Messaging — FirebaseConfig, VAPID, and the server-side topic/send caveats.
sidebar_position: 1
---

# Firebase provider

The Firebase provider wraps Firebase Cloud Messaging (FCM) for push. Add the peer dependencies:

```bash
yarn add firebase @capacitor/push-notifications
```

## Configure

`FirebaseConfig` is a union — pass a raw config object or an existing Firebase app.

### Raw config

```ts
import { notifications } from 'notification-kit';

await notifications.init({
  provider: 'firebase',
  config: {
    apiKey: '...',
    authDomain: '...',
    projectId: '...',
    storageBucket: '...',
    messagingSenderId: '...',
    appId: '...',
    measurementId: '...',   // optional
    vapidKey: '...',        // required for web push
  },
});
```

### Existing Firebase app

If your app already created a Firebase instance, reuse it:

```ts
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseOptions);

await notifications.init({
  provider: 'firebase',
  config: { app, vapidKey: '...' },
});
```

Or via the quick-start helper:

```ts
import { quickStart } from 'notification-kit';
await quickStart.initFirebaseWithApp(app, vapidKey);
```

## What the provider does

| Method | Behaviour |
|---|---|
| `requestPermission()` | Requests notification permission and registers for FCM. |
| `getToken()` | Returns the FCM registration token. |
| `deleteToken()` | Deletes the current FCM token. |
| `onMessage` | Foreground message delivery → surfaces as `notificationReceived`. |
| `onTokenRefresh` | Token rotation → surfaces as `tokenRefreshed`. |

## Server-side only operations (important)

These deliberately throw on the client because FCM requires admin credentials for them:

- **`subscribe(topic)` / `unsubscribe(topic)`** — FCM topic management is an Admin SDK / IID API operation. The provider throws a descriptive error: send the device token from `getToken()` to your backend and subscribe it there.
- **`sendNotification(payload)`** — client-side sending is not supported; it throws. Send from your backend with the Admin SDK.
- **`getSubscriptions()`** — FCM does not expose a device's topic subscriptions to the client; it returns `[]` so callers can treat "unknown" as "none". Track subscriptions in your backend if you need an authoritative list.

```ts
// Server-side
import admin from 'firebase-admin';
await admin.messaging().subscribeToTopic([token], 'news');
await admin.messaging().send({ token, notification: { title, body } });
```

## Web push

Web push needs a VAPID key and a service worker (`firebase-messaging-sw.js`). See [Web setup](/platforms/web).

## Banned native plugins

Do not add `@capacitor-firebase/crashlytics` or `@capacitor-firebase/performance` alongside this provider — they require extra Gradle/Console wiring and are unrelated to messaging. Use Sentry for errors if you need crash reporting.
