---
title: In-app notifications
description: Show toast-style success, error, warning, and info notifications inside your app with notification-kit.
sidebar_position: 3
---

# In-app notifications

In-app notifications are toast-style messages rendered inside your application. They need no native plugin and no provider — they work in any browser and on native. Use them for confirmations, errors, and transient status.

## Shortcuts

```ts
import { notifications } from 'notification-kit';

await notifications.success('Saved', 'Your changes are saved.');
await notifications.error('Upload failed', 'Please try again.');
await notifications.warning('Heads up', 'Your session expires soon.');
await notifications.info('New message', 'You have 1 unread message.');
```

Each returns a `Promise<string>` resolving to the notification id, which you can use to dismiss it programmatically.

## Full control

```ts
const id = await notifications.showInApp({
  title: 'New message',
  message: 'Tap to open your inbox',
  type: 'info',            // 'success' | 'error' | 'warning' | 'info'
  position: 'top-right',
  duration: 4000,          // ms; omit for sticky
  dismissible: true,
  action: { label: 'Open', onClick: () => openInbox() },
  onDismiss: () => console.log('dismissed'),
});
```

### `InAppOptions`

| Field | Type | Notes |
|---|---|---|
| `title` | `string` | Required. |
| `message` | `string` | Body text. |
| `type` | `'success' \| 'error' \| 'warning' \| 'info'` | Visual style. |
| `duration` | `number` | Auto-dismiss after ms. |
| `position` | `NotificationPosition` | `top`, `top-left`, `top-right`, `bottom`, `bottom-left`, `bottom-right`, `center`. |
| `dismissible` | `boolean` | Show a close affordance. |
| `action` | `{ label, onClick }` | Single primary action. |
| `actions` | `Array<{ id?, label, onClick }>` | Multiple actions. |
| `onAction` | `(action: string) => void` | Fired when an action runs. |
| `icon` | `string` | Custom icon. |
| `className` / `style` | — | Styling overrides. |
| `onDismiss` | `() => void` | Fired on dismiss. |
| `data` | `Record<string, any>` | Arbitrary payload. |

## Managing active notifications

The standalone in-app helpers are exported directly:

```ts
import {
  showInAppNotification,
  dismissInAppNotification,
  dismissAllInAppNotifications,
  getActiveInAppNotifications,
  configureInAppNotifications,
} from 'notification-kit';

const id = await showInAppNotification({ title: 'Hi', type: 'info' });
dismissInAppNotification(id);
dismissAllInAppNotifications();

const active = getActiveInAppNotifications();

// Set app-wide defaults
configureInAppNotifications({ position: 'bottom', duration: 3000 });
```

## React

The React entry point exposes hooks for in-app notifications, including a simple variant, a queue, and a persistence variant:

```tsx
import { useInAppNotification } from 'notification-kit/react';
```

See [React hooks](/guides/react-hooks).

## Security note

In-app notification content is rendered as text, not raw HTML — user-provided strings are not injected as markup. Keep custom `icon` values to known-safe sources.
