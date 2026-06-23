---
title: Installation
description: Install notification-kit and the optional peer dependencies you need per provider and platform.
sidebar_position: 1
---

# Installation

Install the package with your package manager:

```bash
yarn add notification-kit
# or
npm install notification-kit
```

`notification-kit` ships with **zero required dependencies**. Every peer dependency is optional — install only the ones your app actually uses. The library loads each one dynamically, so a missing dependency surfaces as a descriptive runtime error in the feature that needs it, not an install-time failure.

## Choose what to add

### React hooks

If you want the `notification-kit/react` entry point:

```bash
yarn add react react-dom
```

### Local notifications

For scheduled / local notifications on iOS and Android:

```bash
yarn add @capacitor/core @capacitor/local-notifications
```

### Push via Firebase Cloud Messaging

```bash
yarn add firebase @capacitor/push-notifications
```

Use `firebase` for web push and `@capacitor/push-notifications` for native FCM. See the [Firebase provider](/providers/firebase) and [Android](/platforms/android) / [iOS](/platforms/ios) setup pages.

### Push via OneSignal

```bash
yarn add react-onesignal
```

See the [OneSignal provider](/providers/onesignal) page.

### Cross-device preference storage (optional)

If you let the library persist anything via `@capacitor/preferences`:

```bash
yarn add @capacitor/preferences
```

## Peer version floors

The published package declares these minimum peer versions (all optional):

| Peer | Minimum |
|---|---|
| `@capacitor/core` | `>=8.3.4` |
| `@capacitor/local-notifications` | `>=8.2.0` |
| `@capacitor/preferences` | `>=8.0.1` |
| `@capacitor/push-notifications` | `>=8.1.1` |
| `firebase` | `>=12.13.0` |
| `react` / `react-dom` | `>=19.2.6` |
| `react-onesignal` | `>=3.5.3` |

## Capacitor sync

After adding any Capacitor plugin, sync the native projects:

```bash
npx cap sync
```

## Optional setup CLI

The package ships a small setup helper you can run once to scaffold provider config:

```bash
npx notification-kit-setup
```

## Verify the import

```ts
import { notifications, version } from 'notification-kit';
console.log('notification-kit', version);
```

Next: the [Quick Start](/getting-started/quick-start).
