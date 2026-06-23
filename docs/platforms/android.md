---
title: Android setup
description: google-services.json, POST_NOTIFICATIONS, channels, and FCM configuration for notification-kit on Android.
sidebar_position: 2
---

# Android setup

Push on Android uses Firebase Cloud Messaging through `@capacitor/push-notifications`. Local notifications use `@capacitor/local-notifications`. This page covers the native wiring; the JavaScript API is identical to other platforms.

## 1. Install and sync

```bash
yarn add @capacitor/push-notifications @capacitor/local-notifications firebase
npx cap sync android
```

## 2. Firebase project files

Download `google-services.json` from the Firebase console (Project settings → your Android app) and place it at `android/app/google-services.json`.

Add the Google services plugin in Gradle:

```groovy
// android/build.gradle
buildscript {
  dependencies {
    classpath 'com.google.gms:google-services:4.4.2'
  }
}
```

```groovy
// android/app/build.gradle
apply plugin: 'com.google.gms.google-services'

dependencies {
  implementation platform('com.google.firebase:firebase-bom:33.5.1')
  implementation 'com.google.firebase:firebase-messaging'
}
```

(Use the current BOM / plugin versions; the values above are illustrative.)

## 3. POST_NOTIFICATIONS (Android 13+)

Android 13 (API 33) and later require the runtime `POST_NOTIFICATIONS` permission before any notification is shown. `@capacitor/push-notifications` injects the permission into the merged manifest; request it at runtime via `notifications.requestPermission()` from a user action — never silently at launch.

Verify the merged manifest before release:

```
android/app/build/intermediates/merged_manifests/*/AndroidManifest.xml
```

## 4. Notification channels

On Android 8+ every notification must belong to a channel. Create your channels after init (see the [Channels guide](/guides/channels)):

```ts
await NotificationKit.getInstance().createChannel({
  id: 'default', name: 'General', importance: 4,
});
```

## 5. Server payload

Sending is server-side. A typical Admin-SDK payload for Android sets the channel and priority:

```ts
await admin.messaging().send({
  token,
  notification: { title, body },
  android: {
    priority: 'high',
    notification: { channelId: 'default', icon: 'ic_notification' },
  },
});
```

## Play Store note

If a native SDK reads the advertising ID (for example Firebase Analytics native), declare `com.google.android.gms.permission.AD_ID` and keep the Play Console "Advertising ID" + Data-safety declarations in agreement. notification-kit itself does not require AD_ID.
