---
title: FAQ
description: Common questions about notification-kit — providers, platforms, server-side sending, bundle size, and more.
sidebar_position: 1
---

# Frequently asked questions

### Do I need both Firebase and OneSignal?

No. Pick one provider per app and pass it to `init()`. Each provider's SDK is an optional peer dependency, so you only install the one you use.

### Can I send push notifications from the client?

No — and this is by design. Sending push is a privileged server-side operation. The Firebase provider's `sendNotification()` throws. Send from your backend with the Firebase Admin SDK or the provider's REST API, targeting the device token you collected via `getToken()`.

### Why does `subscribe('topic')` throw with Firebase?

FCM topic (un)subscription requires admin credentials (the Admin SDK or the IID API) and cannot run from client code. notification-kit throws a descriptive error instead of failing silently. Send the device token to your backend and subscribe it there. OneSignal uses tags/segments instead — see the [OneSignal provider](/providers/onesignal).

### Do local notifications work on the web?

No. Local notifications use `@capacitor/local-notifications`, which is native-only. On the web, the local-notification methods throw. Use in-app notifications (which work everywhere) or web push for browser delivery.

### Does the library add to my bundle if I only use in-app notifications?

The provider SDKs (Firebase, OneSignal) and the Capacitor plugins are loaded dynamically and only when used. If you only call the in-app API, those heavy dependencies are never imported. Every peer is optional.

### What's the difference between `notifications` and `NotificationKit`?

`NotificationKit` is the class (a singleton). `notifications` is a flat convenience object that delegates to `NotificationKit.getInstance()`. Use `notifications` for ergonomics; reach for the class for `createChannel`, `getCapabilities`, or `destroy`.

### Why must local-notification ids be numeric?

Capacitor identifies scheduled notifications by a numeric id. notification-kit validates the id and throws on a non-numeric value rather than producing `NaN`, which would make `cancel`/`remove` silently no-op while reporting success.

### How do I switch providers at runtime?

`init()` is idempotent (a no-op if already initialized). Call `NotificationKit.getInstance().destroy()` first, then `init()` again with the other provider.

### Does it support iOS provisional (quiet) notifications?

Yes — provisional authorization surfaces as the `provisional` value of `PermissionStatus`.

### Is there a React API?

Yes — import from `notification-kit/react`. It exposes `useNotifications` plus in-app notification hooks. See [React hooks](/guides/react-hooks).

### What permission do I need on Android 13+?

`POST_NOTIFICATIONS`, requested at runtime. `@capacitor/push-notifications` injects it into the merged manifest; request it through `notifications.requestPermission()` from a user action. See [Android setup](/platforms/android).

### Is it open source?

Yes, MIT-licensed. The npm package is [`notification-kit`](https://www.npmjs.com/package/notification-kit); the source is on [GitHub](https://github.com/aoneahsan/notification-kit).
