---
title: Changelog
description: Version history for the notification-kit npm package.
sidebar_position: 99
---

# Changelog

Version history for [`notification-kit`](https://www.npmjs.com/package/notification-kit). This mirrors the package `CHANGELOG.md`; the package follows [Semantic Versioning](https://semver.org/).

## 2.1.1 — 2026-05-27

Post-release polish. No breaking changes — a safe upgrade from 2.1.0.

- **Platform detection** — `version` now reports a parsed browser/OS version instead of echoing the full user-agent; tablets are detected (iPad, Android tablets, and iPadOS that masquerades as macOS) so `isDesktop` no longer misclassifies them.
- **Scheduling** — the relative-delay `in` option now works: it accepts a `Duration` (e.g. `{ minutes: 5 }`) or a millisecond number and resolves to an absolute time. Recurring examples use the top-level `every` + `on` shape.
- Documented the difference between the provider-backed permission flow and the standalone `permissions` helper; documented schedule day-rollover.
- Removed dead internal code (`FirebaseNativeBridge.validateEnvironmentVariables`).

## 2.1.0 — 2026-05-26

A polish-and-hardening release: dependencies updated to latest stable, a full security/correctness audit remediated, packaging modernized.

### Peer dependency requirements raised

- `@capacitor/core` `>=8.3.4`, `@capacitor/local-notifications` `>=8.2.0`, `@capacitor/preferences` `>=8.0.1`, `@capacitor/push-notifications` `>=8.1.1`
- `firebase` `>=12.13.0`
- `react` / `react-dom` `>=19.2.6`
- `react-onesignal` `>=3.5.3` (the OneSignal provider was rewritten to the v3 API)

### Security

- OneSignal `sendNotification()` no longer sends the REST API key from client code — sending must happen on a trusted server (the key is account-level).
- In-app notification icons render safely (sandboxed `<img>` for image URLs, text otherwise); no `innerHTML` sink remains.
- `config-validator` no longer scans `process.env`; production checks are browser-safe.

### Fixes & improvements

- `isSupported()` now reports real per-platform capabilities.
- Push events reach `notifications.onPush` / `onPushOpened`; the event envelope no longer corrupts `event.type`.
- Native local-notification listeners are cleaned up on `destroy()`.
- Firebase: foreground messages populate top-level `title`/`body`; native FCM works via `PushNotifications.register()`; safer token refresh.
- OneSignal provider rewritten to the react-onesignal v3 namespaced API.
- Storage: Unicode-safe encoding, working `clear()`, per-record TTL.
- React hooks: removed a 1 Hz render loop (subscription-based now), fixed listener churn that dropped notifications, added `isPermissionGranted`.
- Scheduling/date math hardened; formatting edge cases guarded.
- Leveled logger (default `warn`) with a `localStorage` switch and `setLevel`.

### Packaging

- Ships **both ESM and CommonJS**.
- `engines.node` lowered to `>=20`; added `"sideEffects": false`.
- Service-worker templates ship in the package and deploy via `notification-kit-setup`.
- `version` is single-sourced from `package.json`.

---

For the complete history, see [`CHANGELOG.md`](https://github.com/aoneahsan/notification-kit/blob/main/CHANGELOG.md) in the package repository.
