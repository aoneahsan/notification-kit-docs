---
title: Troubleshooting
description: Fix common notification-kit problems — permission denials, missing tokens, channels not appearing, service-worker issues.
sidebar_position: 2
---

# Troubleshooting

### "NotificationKit must be initialized before use"

A method that needs a provider was called before `init()` resolved. Await `notifications.init(config)` before calling `requestPermission`, `getToken`, `subscribe`, or `sendPushNotification`.

### `getToken()` returns nothing or rejects

- Permission must be `granted` first — call `requestPermission()` and check the result.
- **Web**: you need a service worker (`firebase-messaging-sw.js`) and a VAPID key; the page must be served over HTTPS or `localhost`.
- **Android**: `google-services.json` must be present and the Google services Gradle plugin applied; re-run `npx cap sync`.
- **iOS**: the APNs auth key must be uploaded to your provider, and the Push Notifications + Background Modes (remote notifications) capabilities enabled.

### Permission is stuck on `denied`

Once a user blocks notifications, the platform will not re-prompt. You must send them to system settings. notification-kit does not open settings for you (`permissions.openSettings()` throws by design) — wire your own settings deep link, and provide a non-notification fallback.

### Local notification not firing

- Ids must be numeric or numeric strings — a non-numeric id throws.
- `@capacitor/local-notifications` must be installed and synced (`npx cap sync`).
- On the web, local notifications are unsupported and throw — guard with a platform check.
- For recurring notifications, confirm your `every`/`on` pattern; check the device's exact-alarm and battery-optimization settings on Android.

### Android channel not appearing

- Channels exist only on Android; `listChannels()` returns `[]` elsewhere.
- Create the channel before posting to it, and reference its `id` via `channelId` when scheduling.
- Changing a channel's importance after creation has no effect — the user controls it in system settings once created. Use a new channel id if you must change defaults.

### Web push silently does nothing

- Confirm the service worker is registered and `serviceWorkerPath` matches the file location.
- Confirm the VAPID key is set for Firebase web push.
- Check the browser console for service-worker registration errors and the Notifications permission state.
- Safari requires version 16+ and a configured `safariWebId` for OneSignal.

### `subscribe()` throws (Firebase)

Expected — FCM topics are server-side. Send the device token to your backend and subscribe it with the Admin SDK. See the [Firebase provider](/providers/firebase).

### `cancelAll` / `getDelivered` throws on web

These are native-only operations and throw on the web platform. Guard them with `notifications` calls only on native, or check `platform.detect()` first.

### Turning on debug logging

The logger defaults to `warn`. Raise it at runtime:

```ts
import { dev } from 'notification-kit';
dev.enableDebug();
// or set the log level via the logger's localStorage switch
window.__setLogLevel?.('debug');
```

Still stuck? Open an issue at [github.com/aoneahsan/notification-kit/issues](https://github.com/aoneahsan/notification-kit/issues) with your platform, provider, and a minimal repro.
