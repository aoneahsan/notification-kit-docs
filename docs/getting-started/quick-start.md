---
title: Quick Start
description: Initialize notification-kit, request permission, get a push token, and schedule notifications in five minutes.
sidebar_position: 2
---

# Quick Start

This walks through initializing the library, requesting permission, getting a device token, scheduling a local notification, and showing an in-app toast. Every call below is part of the public `notifications` helper exported from `notification-kit`.

## 1. Initialize

Initialize once at app startup with a provider and its config. Firebase shown here; see [Configuration](/getting-started/configuration) and the [providers](/providers/firebase) pages for the full option set.

```ts
import { notifications } from 'notification-kit';

await notifications.init({
  provider: 'firebase',
  config: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY, // web push
  },
});
```

> Never hardcode keys — read them from environment variables.

## 2. Request permission and get a token

```ts
const granted = await notifications.requestPermission();

if (granted) {
  const token = await notifications.getToken();
  // Send this token to YOUR backend so it can target this device.
  await fetch('/api/devices', {
    method: 'POST',
    body: JSON.stringify({ token }),
  });
}
```

`requestPermission()` runs the provider-specific flow (FCM registration / the OneSignal prompt) and returns a boolean. `getToken()` resolves to the device push token.

## 3. Receive push notifications

```ts
const unsubscribe = notifications.onPush((notification) => {
  console.log('Push received:', notification);
});

// Notification opened / action tapped
notifications.onPushOpened((notification) => {
  // route the user based on notification.data
});
```

`onPush` only forwards push notifications (not local ones). Both return an unsubscribe function.

## 4. Schedule a local notification

Local notification ids must be numeric (or numeric strings) so they can be cancelled later.

```ts
await notifications.schedule({
  id: 1001,
  title: 'Stand up',
  body: 'You have been sitting for an hour.',
  schedule: { at: new Date(Date.now() + 60 * 60 * 1000) },
});

// later
await notifications.cancel(1001);
```

## 5. Show an in-app notification

```ts
await notifications.success('Saved', 'Your changes are saved.');
await notifications.error('Upload failed', 'Please try again.');

// full control
await notifications.showInApp({
  title: 'New message',
  message: 'Tap to open',
  type: 'info',
  position: 'top-right',
  duration: 4000,
  action: { label: 'Open', onClick: () => openInbox() },
});
```

## React version

```tsx
import { useNotifications } from 'notification-kit/react';

function NotificationsSetup() {
  const { init, requestPermission, token, permission } = useNotifications();

  useEffect(() => {
    init({ provider: 'firebase', config: firebaseConfig });
  }, []);

  return (
    <button onClick={requestPermission}>
      {permission === 'granted' ? `Token: ${token?.slice(0, 12)}…` : 'Enable notifications'}
    </button>
  );
}
```

See [React hooks](/guides/react-hooks) for the full hook surface.

## Next

- [Push notifications guide](/guides/push-notifications)
- [Local notifications guide](/guides/local-notifications)
- [Configuration](/getting-started/configuration)
