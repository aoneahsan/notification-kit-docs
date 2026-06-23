---
title: Introduction
description: notification-kit is a unified notification library for React + Capacitor apps — one API for push, local, and in-app notifications across Web, iOS, and Android.
slug: /intro
sidebar_position: 1
---

# notification-kit

`notification-kit` gives a React + Capacitor application a single API for three kinds of notification instead of wiring Firebase, OneSignal, and the Capacitor plugins separately:

- **Push notifications** — through a pluggable provider, either Firebase Cloud Messaging or OneSignal. The library manages the permission flow, the device token, topic-subscription requests, and inbound message delivery.
- **Local notifications** — through `@capacitor/local-notifications`. Schedule at an absolute date, after a relative delay, or on a recurring calendar pattern; cancel, list pending, and read or remove delivered notifications.
- **In-app notifications** — toast-style messages (`success`, `error`, `warning`, `info`) rendered inside your app with positions, durations, and action buttons. These need no native plugin and run in any browser.

You initialize once with a provider, then call the same methods on Web, iOS, and Android. The library detects the platform and degrades gracefully when an optional dependency is not installed.

## Zero required dependencies

Every peer dependency — `@capacitor/core`, `@capacitor/local-notifications`, `@capacitor/preferences`, `@capacitor/push-notifications`, `firebase`, `react`, `react-dom`, `react-onesignal` — is declared optional. The core works with none of them installed; each is loaded dynamically only when you actually use the feature that needs it. Add only the dependencies your app uses.

## What it does not do

Being honest about scope saves debugging time:

- **It does not send push notifications from the client.** Sending push is a privileged server-side operation (Firebase Admin SDK / a provider REST API). The Firebase provider's `sendNotification()` deliberately throws — call your own backend to send.
- **It does not manage FCM topics from the client.** With Firebase, `subscribe()` / `unsubscribe()` throw a descriptive error: FCM topic management requires the Admin SDK or the IID API. Send the device token from `getToken()` to your backend and subscribe it there. (OneSignal handles tags/segments differently — see the [OneSignal provider](/providers/onesignal) page.)
- **It does not open the OS notification-settings screen for you.** `permissions.openSettings()` is intentionally not implemented internally to preserve the zero-dependency design; wire your own settings plugin if you need it.

## Package facts

| Property | Value |
|---|---|
| npm | [`notification-kit`](https://www.npmjs.com/package/notification-kit) |
| License | MIT |
| Module formats | ESM + CJS |
| Types | Bundled (`.d.ts`) |
| Entry points | `notification-kit`, `notification-kit/react` |
| Node (build) | >= 20 |

## Where to go next

- [Installation](/getting-started/installation) — install the package and the optional peers you need.
- [Quick Start](/getting-started/quick-start) — initialize, request permission, and show your first notification.
- [Configuration](/getting-started/configuration) — the full `NotificationConfig` object.
- [API Reference](/reference/api-overview) — every export, method, and type.

Built and maintained by [Ahsan Mahmood](https://aoneahsan.com).
