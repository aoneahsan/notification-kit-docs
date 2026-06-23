---
title: Events
description: The notification-kit event map and how to subscribe and unsubscribe with on/off.
sidebar_position: 6
---

# Events

notification-kit emits typed events for everything that happens — readiness, received notifications, token changes, permission changes, channel changes, and errors. Subscribe with `on()` (which returns an unsubscribe function) and remove with `off()`.

```ts
import { notifications } from 'notification-kit';

const off = notifications.on('notificationReceived', (event) => {
  console.log(event.type, event.data);
});

off(); // or: notifications.off('notificationReceived', handler)
```

## Event envelope

Every callback receives a `NotificationEvent`. The canonical `event.type` is always the event name, and the original payload is available both spread onto the event and under `event.data`:

```ts
{
  id: string,        // unique per emission
  type: string,      // the event name
  timestamp: Date,
  data: <payload>,   // the full original payload
  // ...payload fields are also spread on top level
}
```

The payload spread sets the envelope fields (`type`, `id`, `timestamp`) last, so a payload field accidentally named `type` cannot clobber the canonical event type.

## Event names

| Event | Fired when | Key payload fields |
|---|---|---|
| `ready` | `init()` completes | `platform`, `capabilities` |
| `notificationReceived` | push or local notification arrives | `payload`, `type` ('push' \| 'local'), `platform` |
| `notificationActionPerformed` | a notification is tapped / action run | `action`, `notification`, `inputValue` |
| `notificationSent` | a send is dispatched | `payload`, `type` |
| `notificationScheduled` | a local notification is scheduled | `options`, `type` |
| `notificationCancelled` | a local notification is cancelled | `id`, `type` |
| `notificationShown` | an in-app notification is shown | `options`, `id` |
| `channelCreated` | an Android channel is created | `channel` |
| `channelDeleted` | an Android channel is deleted | `channelId` |
| `tokenReceived` | `getToken()` resolves | `token` |
| `tokenRefreshed` | the platform rotates the token | `token` |
| `permissionChanged` | `requestPermission()` resolves | `granted`, `status` |
| `subscribed` | `subscribe(topic)` succeeds | `topic` |
| `unsubscribed` | `unsubscribe(topic)` succeeds | `topic` |
| `error` | any internal error | `error`, `context` |

## Distinguishing push from local

`notificationReceived` fires for both push and local notifications. The kind is on the payload envelope, which is why `onPush()` checks `event.data.type === 'push'` before forwarding:

```ts
notifications.on('notificationReceived', (event) => {
  if (event.data?.type === 'push') {
    // handle push
  } else {
    // handle local
  }
});
```

## Listener errors are isolated

If one listener throws, the kit logs the error and continues calling the remaining listeners — one bad handler never blocks the others.
