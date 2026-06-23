---
title: React hooks reference
description: Full return types for useNotifications and the in-app notification hooks.
sidebar_position: 4
---

# React hooks reference

Exported from `notification-kit/react`. React and react-dom are optional peers.

## `useNotifications(): UseNotificationsReturn`

### `UseNotificationsState`

```ts
interface UseNotificationsState {
  isInitialized: boolean;
  isInitializing: boolean;
  permission: PermissionStatus | null;
  token: string | null;
  error: Error | null;
  notifications: Notification[];
  pendingNotifications: Notification[];
  subscriptions: string[];
}
```

### `UseNotificationsReturn` (extends the state)

```ts
interface UseNotificationsReturn extends UseNotificationsState {
  // Initialization
  init: (config: NotificationConfig) => Promise<void>;
  destroy: () => Promise<void>;

  // Permissions
  requestPermission: () => Promise<boolean>;
  checkPermission: () => Promise<PermissionStatus>;
  isPermissionGranted: boolean; // derived

  // Token
  getToken: () => Promise<string>;
  refreshToken: () => Promise<string>;

  // Subscriptions
  subscribe: (topic: string) => Promise<void>;
  unsubscribe: (topic: string) => Promise<void>;

  // Local notifications
  scheduleNotification: (options: ScheduleOptions & { id: string; title: string; body: string }) => Promise<void>;
  cancelNotification: (id: number) => Promise<void>;
  getPendingNotifications: () => Promise<Notification[]>;

  // Channels (Android)
  createChannel: (channel: NotificationChannel) => Promise<void>;
  deleteChannel: (channelId: string) => Promise<void>;
  listChannels: () => Promise<NotificationChannel[]>;

  // Events
  addEventListener: <T extends keyof NotificationEventMap>(event: T, cb) => () => void;

  // In-app
  showInApp: {
    show: (options: InAppOptions) => Promise<string>;
    success: (title: string, message?: string) => Promise<string>;
    error: (title: string, message?: string) => Promise<string>;
    warning: (title: string, message?: string) => Promise<string>;
    info: (title: string, message?: string) => Promise<string>;
  };

  // Utilities
  clearNotifications: () => void;
  clearError: () => void;
  refresh: () => Promise<void>;
  isSupported: () => Promise<boolean>;
}
```

All returned functions are memoized (stable references), and any event listeners registered through the hook are removed on unmount.

## In-app notification hooks

```ts
import {
  useInAppNotification,
  useInAppNotificationSimple,
  useInAppNotificationQueue,
  useInAppNotificationPersistence,
} from 'notification-kit/react';
```

| Hook | Returns | Use for |
|---|---|---|
| `useInAppNotification` | `UseInAppNotificationReturn` | Full control + active-notification state. |
| `useInAppNotificationSimple` | minimal API | Quick show/dismiss without state. |
| `useInAppNotificationQueue` | queue API | One-at-a-time presentation. |
| `useInAppNotificationPersistence` | persisted API | Survive across renders/navigation. |

The exported types `UseInAppNotificationState` and `UseInAppNotificationReturn` describe their state and surface.

## Re-exported utilities

For one-import ergonomics, the React entry also re-exports `showInAppNotification`, `dismissInAppNotification`, `dismissAllInAppNotifications`, `getActiveInAppNotifications`, `configureInAppNotifications`, `inApp`, `validate`, `format`, `SchedulingUtils`, `permissions`, `storage`, `platform`, and the core types.
