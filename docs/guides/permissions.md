---
title: Permissions
description: How notification-kit handles notification permission — provider-driven flow versus the standalone permission helper.
sidebar_position: 5
---

# Permissions

notification-kit has two permission paths. They exist for different callers and you usually use just one.

## Provider-driven permission (recommended)

When the kit is initialized with a provider, request permission through the kit. This runs provider-specific work (FCM registration, the OneSignal prompt):

```ts
import { notifications } from 'notification-kit';

const granted = await notifications.requestPermission(); // boolean
const status = await notifications.checkPermission();    // PermissionStatus
const isOn = await notifications.isPermissionGranted();  // boolean
```

`requestPermission()` also emits a `permissionChanged` event you can observe globally:

```ts
notifications.on('permissionChanged', (e) => {
  // e.granted, e.status
});
```

## Standalone permission helper

For callers that are not going through a provider, the library exports a provider-agnostic `permissions` manager:

```ts
import { permissions } from 'notification-kit';

const status = await permissions.check();
const result = await permissions.request();
```

This is a generic permission API; prefer the kit's `requestPermission()` when a provider is configured so the provider's registration runs too.

## Permission states

`PermissionStatus` is one of:

| Status | Meaning |
|---|---|
| `granted` | The user allowed notifications. |
| `denied` | The user blocked notifications. |
| `prompt` | Not yet asked — safe to request. |
| `provisional` | iOS quiet (provisional) authorization. |
| `default` | Browser default (not yet decided). |
| `unknown` | Could not determine. |

## Opening system settings

`permissions.openSettings()` is intentionally **not implemented internally**. Opening the OS settings screen requires a native plugin, and adding one would break the zero-dependency philosophy. The method throws a descriptive error telling you to wire your own settings plugin (for example `@capacitor/app` + a deep link, or a community settings plugin) if you need to send a blocked user to settings.

## Good practice

- Ask in context, after the user does something that benefits from notifications — not on first launch.
- Check `checkPermission()` first; only call `requestPermission()` when the status is `prompt`/`default`.
- Provide a non-notification fallback when permission is `denied`.
