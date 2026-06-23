---
title: Utilities
description: validate, format, SchedulingUtils, platform, permissions, storage, quickStart, and dev helpers.
sidebar_position: 7
---

# Utilities

Beyond the notification API, notification-kit exports several helpers.

## `platform`

Platform detection and capabilities.

```ts
import { platform } from 'notification-kit';

const info = platform.detect();            // PlatformDetection
const caps = await platform.getCapabilities(); // PlatformCapabilities
```

## `permissions`

Provider-agnostic permission API (see the [Permissions guide](/guides/permissions)).

```ts
import { permissions } from 'notification-kit';
const status = await permissions.check();
const result = await permissions.request();
```

## `storage`

A storage abstraction that works with or without `@capacitor/preferences`. Use `createStorage()` for a custom instance.

```ts
import { storage, createStorage } from 'notification-kit';
```

## `validate` and `format`

```ts
import { validate, format } from 'notification-kit';
```

`validate` (a `ValidationUtils` surface) checks notification payloads and returns `ValidationError` / `ValidationWarning` results. `format` (a `FormattingUtils` surface) provides formatting helpers for notification content.

## `SchedulingUtils`

Helpers for constructing recurring/calendar schedules used in `ScheduleOptions`.

```ts
import { SchedulingUtils } from 'notification-kit';
```

## `inApp`

The in-app notification namespace with the manager and standalone helpers (`showInAppNotification`, `dismissInAppNotification`, `dismissAllInAppNotifications`, `getActiveInAppNotifications`, `configureInAppNotifications`). See [In-app notifications](/guides/in-app-notifications).

## Capacitor conversion utilities

When you need to map between the library's types and raw Capacitor shapes:

`toCapacitorImportance`, `fromCapacitorImportance`, `toCapacitorChannel`, `fromCapacitorChannel`, `toCapacitorLocalNotification`, `fromCapacitorLocalNotification`, `toPlatformCapabilities`.

## `quickStart`

One-call initializers and shortcut actions:

```ts
import { quickStart } from 'notification-kit';

await quickStart.initFirebase({ apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, vapidKey });
await quickStart.initOneSignal({ appId });
const { granted, token } = await quickStart.setup();   // request + get token
quickStart.success('Saved');                            // in-app shortcut
await quickStart.scheduleLocal({ id: 1, title, body, schedule: { at: new Date() } });
quickStart.subscribe('news');
```

## `dev`

Debug helpers, active only when you opt in:

```ts
import { dev } from 'notification-kit';

dev.enableDebug();
dev.getPlatformInfo();
await dev.getCapabilities();
await dev.test.inApp();      // show a test in-app notification
await dev.test.permission(); // request permission
await dev.test.schedule();   // schedule a 5-second test local notification
```

## `metadata`, `features`, `compatibility`, `version`

```ts
import { version, metadata, features, compatibility } from 'notification-kit';
```

`version` is the package version string. `metadata` carries name/author/license/keywords and supported platforms/frameworks/providers. `features` is a feature-flag map. `compatibility` is the browser/mobile support matrix (see [Web setup](/platforms/web)).
