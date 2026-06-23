---
title: Configuration
description: The full NotificationConfig object passed to notifications.init() — provider, in-app defaults, debug, storage, and feature flags.
sidebar_position: 3
---

# Configuration

`notifications.init()` (and `NotificationKit.init()`) take a single `NotificationConfig` object. Only `provider` and `config` are required; everything else has sensible defaults.

```ts
import { notifications } from 'notification-kit';

await notifications.init({
  provider: 'firebase',          // 'firebase' | 'onesignal'  (required)
  config: { /* provider config */ }, // required — see provider pages
  inApp: { /* in-app defaults */ },
  debug: false,
  autoInit: true,
  serviceWorkerPath: '/firebase-messaging-sw.js',
  storage: { /* StorageConfig */ },
  analytics: { /* AnalyticsConfig */ },
  features: { /* FeatureFlags */ },
});
```

## Fields

| Field | Type | Notes |
|---|---|---|
| `provider` | `'firebase' \| 'onesignal'` | **Required.** Which push provider to initialize. |
| `config` | `ProviderConfig` | **Required.** The provider's config — see [Firebase](/providers/firebase) / [OneSignal](/providers/onesignal). |
| `inApp` | `InAppConfig` | Defaults for in-app toasts (position, duration, theme). |
| `styles` | `StyleConfig` | Styling overrides for in-app notifications. |
| `debug` | `boolean` | Enables verbose logging. |
| `serviceWorkerPath` | `string` | Path to the push service worker (web). |
| `autoInit` | `boolean` | Whether the provider initializes immediately. |
| `storage` | `StorageConfig` | How preferences/state are persisted. |
| `analytics` | `AnalyticsConfig` | Analytics hook configuration. |
| `environment` | `EnvironmentConfig` | Environment-specific overrides. |
| `features` | `FeatureFlags` | Toggle individual features. |
| `localization` | `LocalizationConfig` | Locale strings. |
| `security` | `SecurityConfig` | Security-related options. |
| `backup` | `BackupConfig` | Backup-related options. |

## Provider config shapes

### Firebase

`FirebaseConfig` is a union — pass either a raw config or an existing Firebase app:

```ts
// Raw config
{ apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId?, vapidKey? }

// Existing app instance
{ app: firebaseApp, vapidKey? }
```

### OneSignal

`OneSignalConfig` is also a union — pass `appId` (+ options) or an existing instance:

```ts
// By app id
{ appId, restApiKey?, safariWebId?, autoPrompt?, autoResubscribe?, notifyButton?, welcomeNotification?, ... }

// Existing instance
{ instance: oneSignalInstance }
```

## Convenience initializers

The `quickStart` helper wraps `init()` for the common cases:

```ts
import { quickStart } from 'notification-kit';

await quickStart.initFirebase({ apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, vapidKey });
await quickStart.initOneSignal({ appId, safariWebId });

// with an already-created SDK instance
await quickStart.initFirebaseWithApp(firebaseApp, vapidKey);
await quickStart.initOneSignalWithInstance(oneSignalInstance);
```

## Idempotent init

`init()` is a no-op if the kit is already initialized. Call `destroy()` first if you need to re-initialize with a different provider (for example when switching environments in a test harness).

```ts
await notifications.init({ provider: 'firebase', config });
await NotificationKit.getInstance().destroy();
await notifications.init({ provider: 'onesignal', config: oneSignalConfig });
```

See the full type definitions on the [Config & types reference](/reference/config-types).
