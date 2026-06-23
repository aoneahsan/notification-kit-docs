---
title: Events reference
description: The complete notification-kit event name to payload map.
sidebar_position: 6
---

# Events reference

Subscribe with `notifications.on(event, cb)` or `kit.on(event, cb)`; both return an unsubscribe function. See the [Events guide](/guides/events) for the envelope shape and how push/local are distinguished.

## Event map

| Event | Payload fields (on the event + under `event.data`) |
|---|---|
| `ready` | `platform`, `capabilities` |
| `notificationReceived` | `payload`, `type` (`'push' \| 'local'`), `platform` |
| `notificationActionPerformed` | `action`, `notification`, `inputValue`, `platform` |
| `notificationSent` | `payload`, `type` |
| `notificationScheduled` | `options`, `type` |
| `notificationCancelled` | `id`, `type` |
| `notificationShown` | `options`, `type` (`'inApp'`), `id` |
| `channelCreated` | `channel` |
| `channelDeleted` | `channelId` |
| `tokenReceived` | `token` |
| `tokenRefreshed` | `token` |
| `permissionChanged` | `granted`, `status` |
| `subscribed` | `topic` |
| `unsubscribed` | `topic` |
| `error` | `error`, `context` |

## Event object

Every listener receives:

```ts
interface NotificationEvent {
  id: string;        // unique per emission (crypto.randomUUID when available)
  type: string;      // the event name — canonical, never clobbered
  timestamp: Date;
  data?: any;        // the original payload
  // payload fields are also spread on the top level
}
```

## Typed subscriptions

`on` is generic over `NotificationEventMap`, so the callback payload is typed per event:

```ts
notifications.on('tokenRefreshed', (event) => {
  event.token; // string
});

notifications.on('permissionChanged', (event) => {
  event.granted; // boolean
  event.status;  // PermissionStatus
});
```

## Related exported event types

`NotificationReceivedEvent`, `NotificationActionPerformedEvent`, `NotificationSentEvent`, `NotificationScheduledEvent`, `NotificationCancelledEvent`, `NotificationChannelCreatedEvent`, `NotificationChannelDeletedEvent`, `TokenReceivedEvent`, `TokenRefreshedEvent`, `PermissionChangedEvent`, `SubscribedEvent`, `UnsubscribedEvent`, `ReadyEvent`, `ErrorEvent` — all exported from `notification-kit`.
