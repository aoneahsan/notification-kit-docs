---
title: Web setup
description: Service worker, VAPID key, and browser support for web push with notification-kit.
sidebar_position: 1
---

# Web setup

On the web, in-app and local-style notifications use the browser Notification API, and push uses the provider's web SDK (Firebase web push or OneSignal web SDK). Web push needs a service worker and, for Firebase, a VAPID key.

## Service worker

notification-kit ships service-worker templates for both providers. Copy the relevant template into your site's public root and reference it.

### Firebase

Create `public/firebase-messaging-sw.js` from the template and point the config at it:

```ts
await notifications.init({
  provider: 'firebase',
  serviceWorkerPath: '/firebase-messaging-sw.js',
  config: { /* ...firebase config..., vapidKey */ },
});
```

The template registers the messaging service worker so background web push is delivered.

### OneSignal

OneSignal requires its worker files (`OneSignalSDKWorker.js`) served from your origin. The OneSignal template covers this; see the [OneSignal provider page](/providers/onesignal).

## VAPID key (Firebase web push)

Web push with Firebase needs a Web Push certificate (VAPID key) from the Firebase console (Project settings → Cloud Messaging → Web configuration). Pass it as `vapidKey`:

```ts
config: { /* ... */, vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY }
```

## Requesting permission

The browser only grants notification permission in response to a user gesture and over HTTPS (or `localhost`). Call `requestPermission()` from a click handler:

```ts
button.addEventListener('click', async () => {
  const granted = await notifications.requestPermission();
});
```

## Browser support

The package documents this support matrix for web push and notifications:

| Browser | Push | Notifications |
|---|---|---|
| Chrome | 50+ | yes |
| Firefox | 44+ | yes |
| Safari | 16+ | yes |
| Edge | 79+ | yes |
| Opera | 37+ | (notifications) |

Local notifications scheduled through `@capacitor/local-notifications` are a native feature — on the web the local-notification methods throw, so guard them with a platform check or only call them on native builds.

## Platform detection

```ts
import { platform } from 'notification-kit';

const info = platform.detect();
const caps = await platform.getCapabilities();
```

Use these to branch web-only behaviour.
