---
title: NotificationKit class
description: The NotificationKit singleton — every method, signature, and behaviour.
sidebar_position: 2
---

# `NotificationKit`

`NotificationKit` is the core class. It is a singleton: get it with `NotificationKit.getInstance()`. Most apps use the flat [`notifications`](/reference/notifications) helper instead, which delegates to this instance.

```ts
import { NotificationKit } from 'notification-kit';
const kit = NotificationKit.getInstance();
```

## Lifecycle

| Method | Signature | Notes |
|---|---|---|
| `getInstance` | `static getInstance(): NotificationKit` | Returns the singleton. |
| `init` | `init(config: NotificationConfig): Promise<void>` | Detects platform, initializes the provider, wires listeners, emits `ready`. No-op if already initialized. Also available as `static NotificationKit.init(config)`. |
| `destroy` | `destroy(): Promise<void>` | Removes native listeners, destroys the provider, clears listeners, resets the singleton. |
| `isInitialized` | `isInitialized(): boolean` | |
| `getPlatform` | `getPlatform(): Platform` | `'web' \| 'ios' \| 'android' \| 'electron' \| 'unknown'`. |
| `getCapabilities` | `getCapabilities(): PlatformCapabilities \| null` | |
| `getProvider` | `getProvider(): NotificationProvider \| null` | |

## Permissions and token

| Method | Signature | Notes |
|---|---|---|
| `requestPermission` | `requestPermission(): Promise<boolean>` | Provider-driven; emits `permissionChanged`. |
| `checkPermission` | `checkPermission(): Promise<PermissionStatus>` | |
| `getToken` | `getToken(): Promise<string>` | Emits `tokenReceived`. |

## Topics

| Method | Signature | Notes |
|---|---|---|
| `subscribe` | `subscribe(topic: string): Promise<void>` | Emits `subscribed`. With Firebase this throws (server-side only). |
| `unsubscribe` | `unsubscribe(topic: string): Promise<void>` | Emits `unsubscribed`. |

## Push and local notifications

| Method | Signature | Notes |
|---|---|---|
| `sendPushNotification` | `sendPushNotification(payload: PushNotificationPayload): Promise<void>` | Delegates to the provider; Firebase rejects client-side send. |
| `scheduleLocalNotification` | `scheduleLocalNotification(options: ScheduleOptions & LocalNotificationPayload): Promise<void>` | Requires `@capacitor/local-notifications`. Emits `notificationScheduled`. |
| `cancelLocalNotification` | `cancelLocalNotification(id: string \| number): Promise<void>` | Id must be numeric or numeric string. Emits `notificationCancelled`. |
| `getPendingLocalNotifications` | `getPendingLocalNotifications(): Promise<Notification[]>` | |
| `showInAppNotification` | `showInAppNotification(options: InAppOptions): Promise<string>` | Returns the in-app id. Emits `notificationShown`. |
| `isSupported` | `isSupported(): Promise<boolean>` | True if push or local notifications are available. |

## Channels (Android)

| Method | Signature | Notes |
|---|---|---|
| `createChannel` | `createChannel(channel: NotificationChannel): Promise<void>` | No-op off Android. Emits `channelCreated`. |
| `deleteChannel` | `deleteChannel(channelId: string): Promise<void>` | No-op off Android. Emits `channelDeleted`. |
| `listChannels` | `listChannels(): Promise<NotificationChannel[]>` | Returns `[]` off Android. |

## Events

| Method | Signature | Notes |
|---|---|---|
| `on` | `on<T extends keyof NotificationEventMap>(event: T, cb): () => void` | Returns an unsubscribe function. |
| `off` | `off<T>(event: T, cb?): void` | Omit `cb` to remove all listeners for the event. |

See [Events](/reference/events) for the event map.

## Errors

Every method that can fail emits an `error` event with `{ error, context }` and re-throws. Methods that need the kit initialized throw `"NotificationKit must be initialized before use"` if called before `init()`.
