---
title: iOS setup
description: APNs key, Push Notifications capability, and background modes for notification-kit on iOS.
sidebar_position: 3
---

# iOS setup

Push on iOS goes through APNs, bridged by Firebase Cloud Messaging (or OneSignal) via `@capacitor/push-notifications`. Local notifications use `@capacitor/local-notifications`.

## 1. Install and sync

```bash
yarn add @capacitor/push-notifications @capacitor/local-notifications firebase
npx cap sync ios
cd ios/App && pod install && cd ../..
```

## 2. APNs authentication key

Create an APNs auth key (`.p8`) in the Apple Developer portal (Certificates, IDs & Profiles → Keys → enable Apple Push Notifications service). Upload it to your provider:

- **Firebase**: Project settings → Cloud Messaging → upload the APNs key with its Key ID and Team ID.
- **OneSignal**: dashboard → app settings → Apple iOS (APNs) → upload the key.

## 3. Xcode capabilities

In Xcode, select the App target → Signing & Capabilities and add:

- **Push Notifications**
- **Background Modes** → check **Remote notifications**

## 4. AppDelegate (Firebase)

If you use the Firebase iOS SDK directly, configure it and forward the APNs token:

```swift
import Firebase
import FirebaseMessaging

func application(_ application: UIApplication,
                 didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
  FirebaseApp.configure()
  return true
}

func application(_ application: UIApplication,
                 didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
  Messaging.messaging().apnsToken = deviceToken
}
```

`@capacitor/push-notifications` handles registration through the bridge; follow the plugin's iOS guide for the exact wiring for your Capacitor version.

## 5. Permission and provisional authorization

iOS supports provisional (quiet) authorization, which surfaces as the `provisional` permission status. Request via `notifications.requestPermission()` and check with `notifications.checkPermission()`.

## 6. Privacy manifest

App Store submissions require a privacy manifest. notification-kit does not collect data itself, but the SDKs you add (Firebase / OneSignal) have their own privacy requirements — follow each SDK's documentation for the `PrivacyInfo.xcprivacy` entries and required-reason API declarations.

## Local notifications

`@capacitor/local-notifications` schedules through `UNUserNotificationCenter`. Scheduling, badges, attachments, and thread identifiers in `ScheduleOptions` map to the native iOS fields. See the [Local notifications guide](/guides/local-notifications).
