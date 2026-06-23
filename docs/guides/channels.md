---
title: Android channels
description: Create, list, and delete Android notification channels with notification-kit.
sidebar_position: 4
---

# Android notification channels

Android groups notifications into channels that users control individually in system settings (sound, importance, vibration). notification-kit exposes channel management that is a **no-op on non-Android platforms**, so you can call these methods unconditionally.

## Create a channel

```ts
import { notifications } from 'notification-kit';
import { NotificationKit } from 'notification-kit';

await NotificationKit.getInstance().createChannel({
  id: 'reminders',
  name: 'Reminders',
  description: 'Scheduled reminders and check-ins',
  importance: 4,        // 1 (min) … 5 (max)
  visibility: 1,        // -1 secret, 0 private, 1 public
  sound: 'default',
  vibration: true,
  lights: true,
  lightColor: '#4f46e5',
  showBadge: true,
});
```

### `NotificationChannel`

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Required, stable identifier. |
| `name` | `string` | Required, shown to users. |
| `description` | `string` | Shown in system settings. |
| `importance` | `1 \| 2 \| 3 \| 4 \| 5` | Higher = more intrusive. |
| `visibility` | `-1 \| 0 \| 1` | Lock-screen visibility. |
| `sound` | `string` | `'default'`, `'none'`, or a resource name. |
| `vibration` | `boolean \| number[]` | On/off or a pattern. |
| `lights` | `boolean` | LED notification light. |
| `lightColor` | `string` | LED color. |
| `showBadge` | `boolean` | Allow app-icon badge. |
| `group` | `string` | Channel group id. |

## List and delete

```ts
const channels = await NotificationKit.getInstance().listChannels();
await NotificationKit.getInstance().deleteChannel('reminders');
```

On non-Android platforms `listChannels()` returns `[]` and `createChannel` / `deleteChannel` resolve without doing anything.

## Posting to a channel

Reference the channel id when scheduling a local notification:

```ts
await notifications.schedule({
  id: 10,
  title: 'Daily check-in',
  body: 'How are you today?',
  channelId: 'reminders',
  schedule: { on: { hour: 9, minute: 0 }, every: 'day' },
});
```

## Events

Channel changes emit events you can observe:

```ts
notifications.on('channelCreated', (e) => console.log(e.channel));
notifications.on('channelDeleted', (e) => console.log(e.channelId));
```

## Android 13+ permission

On Android 13 and later you still need the `POST_NOTIFICATIONS` runtime permission before any notification (channelled or not) is shown. See the [Android setup page](/platforms/android).
