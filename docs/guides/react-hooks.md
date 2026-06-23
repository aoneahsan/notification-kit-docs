---
title: React hooks
description: Use notification-kit/react — useNotifications and the in-app notification hooks.
sidebar_position: 7
---

# React hooks

The `notification-kit/react` entry point provides hooks that wrap the core API with React state. React is an optional peer dependency — install `react` and `react-dom` to use this entry point.

```bash
yarn add react react-dom
```

## `useNotifications`

```tsx
import { useNotifications } from 'notification-kit/react';

function Notifications() {
  const {
    isInitialized, permission, token, error,
    init, requestPermission, getToken,
    scheduleNotification, showInApp, isPermissionGranted,
  } = useNotifications();

  useEffect(() => {
    init({ provider: 'firebase', config: firebaseConfig });
  }, []);

  if (error) return <p>Notifications error: {error.message}</p>;

  return (
    <div>
      <button disabled={!isInitialized} onClick={requestPermission}>
        {isPermissionGranted ? 'Notifications on' : 'Enable notifications'}
      </button>
      {token && <code>{token.slice(0, 16)}…</code>}
      <button onClick={() => showInApp.success('Hi', 'It works')}>
        Test in-app
      </button>
    </div>
  );
}
```

### State

| Field | Type |
|---|---|
| `isInitialized` / `isInitializing` | `boolean` |
| `permission` | `PermissionStatus \| null` |
| `token` | `string \| null` |
| `error` | `Error \| null` |
| `notifications` | `Notification[]` |
| `pendingNotifications` | `Notification[]` |
| `subscriptions` | `string[]` |
| `isPermissionGranted` | `boolean` (derived) |

### Actions

`init`, `destroy`, `requestPermission`, `checkPermission`, `getToken`, `refreshToken`, `subscribe`, `unsubscribe`, `scheduleNotification`, `cancelNotification`, `getPendingNotifications`, `createChannel`, `deleteChannel`, `listChannels`, `addEventListener`, `clearNotifications`, `clearError`, `refresh`, `isSupported`, and a `showInApp` object with `show / success / error / warning / info`.

All returned functions are stable (memoized), and event listeners are cleaned up on unmount.

## In-app notification hooks

```tsx
import {
  useInAppNotification,
  useInAppNotificationSimple,
  useInAppNotificationQueue,
  useInAppNotificationPersistence,
} from 'notification-kit/react';
```

| Hook | Use for |
|---|---|
| `useInAppNotification` | Full in-app notification control + state. |
| `useInAppNotificationSimple` | Minimal show/dismiss surface. |
| `useInAppNotificationQueue` | Queued notifications shown one at a time. |
| `useInAppNotificationPersistence` | Notifications that persist across renders. |

## Convenience re-exports

For ergonomics the React entry also re-exports common utilities so a React app can import everything from one place: `showInAppNotification`, `dismissInAppNotification`, `dismissAllInAppNotifications`, `getActiveInAppNotifications`, `configureInAppNotifications`, `inApp`, `validate`, `format`, `SchedulingUtils`, `permissions`, `storage`, and `platform`.

See the [React hooks reference](/reference/react-hooks) for full return types.
