---
title: Config & types
description: The key configuration and payload types exported by notification-kit.
sidebar_position: 5
---

# Config & types

The package ships full TypeScript definitions. These are the types you reach for most often. Every one is exported from `notification-kit` (and re-exported from `notification-kit/react`).

## `NotificationConfig`

```ts
interface NotificationConfig {
  provider: 'firebase' | 'onesignal';
  config: ProviderConfig;
  inApp?: InAppConfig;
  styles?: StyleConfig;
  debug?: boolean;
  serviceWorkerPath?: string;
  autoInit?: boolean;
  storage?: StorageConfig;
  analytics?: AnalyticsConfig;
  environment?: EnvironmentConfig;
  features?: FeatureFlags;
  localization?: LocalizationConfig;
  security?: SecurityConfig;
  backup?: BackupConfig;
}
```

## `FirebaseConfig`

```ts
type FirebaseConfig =
  | { app: FirebaseApp; vapidKey?: string }
  | {
      apiKey: string;
      authDomain: string;
      projectId: string;
      storageBucket: string;
      messagingSenderId: string;
      appId: string;
      measurementId?: string;
      vapidKey?: string;
    };
```

## `OneSignalConfig`

```ts
type OneSignalConfig =
  | { instance: any }
  | {
      appId: string;
      restApiKey?: string;       // keep server-side
      safariWebId?: string;
      autoPrompt?: boolean;
      autoResubscribe?: boolean;
      path?: string;
      serviceWorkerPath?: string;
      notificationClickHandlerMatch?: 'origin' | 'exact';
      notificationClickHandlerAction?: 'focus' | 'navigate' | 'focusOrNavigate';
      allowLocalhostAsSecureOrigin?: boolean;
      notifyButton?: { enable: boolean; size?: 'small' | 'medium' | 'large'; position?: 'bottom-left' | 'bottom-right'; showCredit?: boolean };
      welcomeNotification?: { title?: string; message?: string; url?: string };
      // …prompt options, etc.
    };
```

## `ScheduleOptions`

The most-used fields (see [Local notifications](/guides/local-notifications) for the full list):

```ts
interface ScheduleOptions {
  id?: string;
  title: string;
  body: string;
  data?: Record<string, any>;
  schedule?: NotificationSchedule;  // { at?, in?, every?, on?, count?, end? }
  channelId?: string;
  at?: Date | string;
  in?: number | Duration;           // delay
  every?: ScheduleEvery | RepeatInterval;
  on?: ScheduleOn;                  // { hour?, minute?, weekday?, day?, month?, ... }
  count?: number;
  until?: Date;
  badge?: number;
  sound?: string;
  smallIcon?: string;
  largeIcon?: string;
  // …iOS thread/summary + Android presentation fields
}
```

## `InAppOptions`

```ts
interface InAppOptions {
  title: string;
  message?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  position?: NotificationPosition;  // top | top-left | top-right | bottom | bottom-left | bottom-right | center
  dismissible?: boolean;
  action?: { label: string; onClick: () => void };
  actions?: Array<{ id?: string; label: string; onClick: () => void }>;
  onAction?: (action: string) => void;
  icon?: string;
  className?: string;
  style?: React.CSSProperties;
  onDismiss?: () => void;
  data?: Record<string, any>;
}
```

## `NotificationChannel`

```ts
interface NotificationChannel {
  id: string;
  name: string;
  description?: string;
  importance?: 1 | 2 | 3 | 4 | 5;
  visibility?: -1 | 0 | 1;
  sound?: string;
  vibration?: boolean | number[];
  lights?: boolean;
  lightColor?: string;
  showBadge?: boolean;
  group?: string;
}
```

## `PermissionStatus`

```ts
type PermissionStatus =
  | 'granted' | 'denied' | 'prompt' | 'provisional' | 'default' | 'unknown';
```

## `Notification`

The normalized shape returned by `getPending()` / `getDelivered()`:

```ts
interface Notification {
  id: string;
  title: string;
  body: string;
  data?: Record<string, any>;
  platform: Platform;
  type: 'push' | 'local' | 'inApp';
  timestamp: Date;
}
```
