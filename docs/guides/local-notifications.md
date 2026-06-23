---
title: Local notifications
description: Schedule, cancel, list, and read local notifications with notification-kit via @capacitor/local-notifications.
sidebar_position: 2
---

# Local notifications

Local notifications are scheduled on-device through `@capacitor/local-notifications`. They work on iOS and Android; on the web, the local-notification methods throw because the underlying plugin is unavailable. Add the peer first:

```bash
yarn add @capacitor/core @capacitor/local-notifications
npx cap sync
```

## Schedule

Ids must be numeric (or a numeric string) so they can be cancelled or removed later — a non-numeric id throws a descriptive error rather than silently failing.

```ts
import { notifications } from 'notification-kit';

// Fire at a specific time
await notifications.schedule({
  id: 1,
  title: 'Reminder',
  body: 'Meeting in 10 minutes',
  schedule: { at: new Date(Date.now() + 10 * 60 * 1000) },
});
```

### Scheduling options

`ScheduleOptions` accepts several trigger styles plus Android/iOS presentation fields:

| Field | Meaning |
|---|---|
| `schedule.at` / `at` | `Date` (or string) — absolute fire time. |
| `in` | Relative delay — a `Duration` like `{ minutes: 5 }`, or a raw millisecond number. |
| `every` | Repeat interval (recurring). |
| `on` | Calendar pattern — `{ hour, minute, weekday, day, month, ... }`. |
| `count` | How many times a recurring notification fires. |
| `until` | Stop date for a recurring notification. |
| `channelId` | Android channel to post to. |
| `smallIcon` / `largeIcon` / `sound` | Android presentation. |
| `attachments` / `threadIdentifier` / `summaryArgument` | iOS presentation. |
| `badge` | App badge count. |

```ts
// Recurring daily at 9:00
await notifications.schedule({
  id: 2,
  title: 'Daily check-in',
  body: 'How are you feeling today?',
  schedule: { on: { hour: 9, minute: 0 }, every: 'day' },
});

// After a delay
await notifications.schedule({
  id: 3,
  title: 'Welcome back',
  body: 'Pick up where you left off',
  in: { minutes: 30 },
});
```

## Cancel

```ts
await notifications.cancel(1);     // one
await notifications.cancelAll();   // all pending (native only)
```

## Inspect

```ts
const pending = await notifications.getPending();      // scheduled, not yet fired
const delivered = await notifications.getDelivered();  // already shown (native only)
```

Both return an array of the library's `Notification` shape (`{ id, title, body, data, platform, type, timestamp }`).

## Remove delivered

```ts
await notifications.removeDelivered('1');
await notifications.removeAllDelivered();
```

## Listening for taps

Local notification taps and actions surface as the `notificationActionPerformed` event:

```ts
notifications.on('notificationActionPerformed', (event) => {
  // event.action, event.notification, event.inputValue
});
```

The kit wires the native `localNotificationReceived` / `localNotificationActionPerformed` listeners during `init()` on non-web platforms and removes them on `destroy()`.

## Channels (Android)

Recurring or categorized notifications usually want a [notification channel](/guides/channels) so users can control them in system settings.
