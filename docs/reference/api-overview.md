---
title: API overview
description: Every export from notification-kit and notification-kit/react.
sidebar_position: 1
---

# API overview

notification-kit has two entry points. This page lists every public export; the following reference pages document each in detail.

## `notification-kit`

### Classes and singletons

| Export | Kind | Reference |
|---|---|---|
| `NotificationKit` | class (singleton via `getInstance()`) | [NotificationKit class](/reference/notification-kit) |
| `notifications` | flat convenience API | [notifications helper](/reference/notifications) |
| `FirebaseProvider` | class | [Firebase provider](/providers/firebase) |
| `OneSignalProvider` | class | [OneSignal provider](/providers/onesignal) |

### Managers and helpers

| Export | Purpose |
|---|---|
| `PermissionManager`, `permissionManager`, `permissions` | Provider-agnostic permission API |
| `PlatformManager`, `platformManager`, `platform` | Platform detection + capabilities |
| `StorageManager`, `storage`, `createStorage` | Storage abstraction |
| `ValidationUtils`, `validate` | Payload validation |
| `FormattingUtils`, `format` | Formatting helpers |
| `SchedulingUtils` | Schedule construction helpers |
| `InAppNotificationManager`, `showInAppNotification`, `dismissInAppNotification`, `dismissAllInAppNotifications`, `getActiveInAppNotifications`, `configureInAppNotifications`, `inApp` | In-app notification control |

### Capacitor conversion utilities

`toCapacitorImportance`, `fromCapacitorImportance`, `toCapacitorChannel`, `fromCapacitorChannel`, `toCapacitorLocalNotification`, `fromCapacitorLocalNotification`, `toPlatformCapabilities`.

### Constants and metadata

| Export | What it is |
|---|---|
| `version` | The package version string (build-time injected) |
| `metadata` | Name, author, license, keywords, supported platforms/frameworks/providers |
| `quickStart` | One-call initializers + shortcut actions |
| `features` | Feature-flag map |
| `compatibility` | Browser/mobile support matrix |
| `dev` | Debug helpers (`enableDebug`, `getPlatformInfo`, `test.*`, …) |
| default export | `NotificationKit` |

### Types

All public types are exported (`NotificationConfig`, `FirebaseConfig`, `OneSignalConfig`, `ScheduleOptions`, `InAppOptions`, `NotificationChannel`, `PermissionStatus`, the full event types, and more) — see [Config & types](/reference/config-types) and [Events](/reference/events).

## `notification-kit/react`

| Export | Kind |
|---|---|
| `useNotifications` | hook |
| `useInAppNotification` | hook |
| `useInAppNotificationSimple` | hook |
| `useInAppNotificationQueue` | hook |
| `useInAppNotificationPersistence` | hook |
| `UseNotificationsState`, `UseNotificationsReturn`, `UseInAppNotificationState`, `UseInAppNotificationReturn` | types |

The React entry also re-exports core types and the in-app/validate/format/scheduling/permissions/storage/platform utilities for convenience. See [React hooks reference](/reference/react-hooks).
