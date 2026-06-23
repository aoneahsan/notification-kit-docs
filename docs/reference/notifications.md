---
title: notifications helper
description: The flat notifications convenience API exported from notification-kit.
sidebar_position: 3
---

# `notifications`

`notifications` is a flat object that delegates to the `NotificationKit` singleton. It is the most ergonomic way to use the library — import it and call methods directly.

```ts
import { notifications } from 'notification-kit';
```

## Init and permissions

| Method | Signature |
|---|---|
| `init` | `(config: NotificationConfig) => Promise<void>` |
| `requestPermission` | `() => Promise<boolean>` |
| `checkPermission` | `() => Promise<PermissionStatus>` |
| `isPermissionGranted` | `() => Promise<boolean>` |
| `getPermissionState` | `() => Promise<PermissionStatus>` |

## Token

| Method | Signature |
|---|---|
| `getToken` | `() => Promise<string>` |
| `deleteToken` | `() => Promise<void>` (throws if the provider has no `deleteToken`) |

## Topics

| Method | Signature |
|---|---|
| `subscribe` | `(topic: string) => Promise<void>` |
| `unsubscribe` | `(topic: string) => Promise<void>` |

## Local notifications

| Method | Signature | Notes |
|---|---|---|
| `schedule` | `(options: ScheduleOptions & LocalNotificationPayload) => Promise<void>` | |
| `cancel` | `(id: string \| number) => Promise<void>` | |
| `cancelAll` | `() => Promise<void>` | Native only; throws on web. |
| `getPending` | `() => Promise<Notification[]>` | |
| `getDelivered` | `() => Promise<Notification[]>` | Native only; throws on web. |
| `removeDelivered` | `(id: string) => Promise<void>` | Native only. |
| `removeAllDelivered` | `() => Promise<void>` | Native only. |

## In-app notifications

| Method | Signature |
|---|---|
| `showInApp` | `(options: InAppOptions) => Promise<string>` |
| `success` | `(title: string, message?: string) => Promise<string>` |
| `error` | `(title: string, message?: string) => Promise<string>` |
| `warning` | `(title: string, message?: string) => Promise<string>` |
| `info` | `(title: string, message?: string) => Promise<string>` |

## Listeners

| Method | Signature | Notes |
|---|---|---|
| `onPush` | `(cb: (notification) => void) => () => void` | Push only. |
| `onPushOpened` | `(cb: (notification) => void) => () => void` | Tap / action. |
| `on` | `<T>(event: T, cb) => () => void` | Any event. |
| `off` | `<T>(event: T, cb?) => void` | |

## Example

```ts
await notifications.init({ provider: 'firebase', config });

if (await notifications.requestPermission()) {
  const token = await notifications.getToken();
  await sendToBackend(token);
}

notifications.onPush((n) => console.log('push', n));

await notifications.schedule({
  id: 42,
  title: 'Reminder',
  body: 'Drink water',
  schedule: { every: 'hour' },
});

await notifications.success('Done');
```
