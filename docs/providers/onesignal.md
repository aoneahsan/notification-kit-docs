---
title: OneSignal provider
description: Configure notification-kit with OneSignal — OneSignalConfig, prompt options, and audience targeting.
sidebar_position: 2
---

# OneSignal provider

The OneSignal provider wraps the OneSignal web/native SDK for push. Add the peer dependency:

```bash
yarn add react-onesignal
```

## Configure

`OneSignalConfig` is a union — pass an `appId` (plus options) or an existing OneSignal instance.

### By app id

```ts
import { notifications } from 'notification-kit';

await notifications.init({
  provider: 'onesignal',
  config: {
    appId: 'your-onesignal-app-id',
    safariWebId: 'web.onesignal.auto.xxxx',  // optional, Safari web push
    autoPrompt: false,                        // control when the prompt shows
    autoResubscribe: true,
    allowLocalhostAsSecureOrigin: true,       // dev only
    notifyButton: {
      enable: true,
      size: 'medium',
      position: 'bottom-right',
      showCredit: false,
    },
    welcomeNotification: {
      title: 'Welcome',
      message: 'Thanks for subscribing!',
    },
  },
});
```

The `restApiKey` field is accepted by the config type, but treat your REST API key as a **server secret** — never ship it in client code. Send notifications from your backend using the OneSignal REST API.

### Existing instance

```ts
import OneSignal from 'react-onesignal';

await notifications.init({
  provider: 'onesignal',
  config: { instance: OneSignal },
});
```

Or via the helper:

```ts
import { quickStart } from 'notification-kit';
await quickStart.initOneSignalWithInstance(OneSignal);
```

## Option highlights

| Field | Purpose |
|---|---|
| `appId` | OneSignal app id (required when not passing `instance`). |
| `safariWebId` | Safari web-push id. |
| `autoPrompt` | Whether OneSignal auto-shows the subscribe prompt. |
| `autoResubscribe` | Re-subscribe returning users automatically. |
| `notifyButton` | The floating bell widget config. |
| `welcomeNotification` | First-subscribe welcome message. |
| `notificationClickHandlerMatch` / `notificationClickHandlerAction` | Click routing behaviour. |

## Audience targeting

OneSignal uses tags and segments rather than FCM-style topics. notification-kit's `subscribe()/unsubscribe()` map to the provider's audience model; for fine-grained targeting, set tags through the OneSignal SDK and send to segments from your backend.

## Web setup

OneSignal web push needs its service-worker files served from your origin; notification-kit ships a OneSignal worker template. See [Web setup](/platforms/web).
