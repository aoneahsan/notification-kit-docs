import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

type Feature = {
  title: string;
  body: string;
};

const FEATURES: Feature[] = [
  {
    title: 'Push notifications',
    body: 'One token-management API on top of Firebase Cloud Messaging or OneSignal. Request permission, get the device token, subscribe to topics, and receive messages — the same calls on Web, iOS, and Android.',
  },
  {
    title: 'Local notifications',
    body: 'Schedule one-off or recurring notifications through @capacitor/local-notifications: fire at a date, after a delay, or on a calendar pattern. Cancel, list pending, and read delivered notifications.',
  },
  {
    title: 'In-app notifications',
    body: 'Toast-style success / error / warning / info notifications rendered in your app with positions, durations, actions, and dismiss callbacks. Works in any browser — no native plugin needed.',
  },
  {
    title: 'Android channels',
    body: 'Create, list, and delete notification channels with importance, visibility, sound, vibration, and lights. Channel calls are no-ops on non-Android platforms, so you can call them unconditionally.',
  },
  {
    title: 'Zero required dependencies',
    body: 'Every peer dependency is optional. The core works with nothing installed; Firebase, OneSignal, React, and the Capacitor plugins are loaded dynamically only when you actually use them.',
  },
  {
    title: 'TypeScript + React hooks',
    body: 'Full type definitions ship with the package, plus a notification-kit/react entry point exposing useNotifications and in-app hooks. Dual ESM + CJS build for any bundler.',
  },
];

function HomepageHeader(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
        <p className={styles.heroTagline}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/getting-started/quick-start"
          >
            Quick Start — 5 min
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/getting-started/installation"
          >
            Installation
          </Link>
          <Link
            className="button button--outline button--lg"
            href="https://www.npmjs.com/package/notification-kit"
          >
            View on npm
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.featuresWrap}>
      <div className="container">
        <div className="row">
          {FEATURES.map((f) => (
            <div key={f.title} className="col col--4" style={{ marginBottom: '1.5rem' }}>
              <div className={styles.featureCard}>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureBody}>{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AuthorStrip(): ReactNode {
  return (
    <section className={styles.authorStrip}>
      <div className="container">
        <p>
          Built and maintained by{' '}
          <Link href="https://aoneahsan.com">Ahsan Mahmood</Link> —{' '}
          <Link href="https://linkedin.com/in/aoneahsan">LinkedIn</Link> ·{' '}
          <Link href="https://github.com/aoneahsan">GitHub</Link> ·{' '}
          <Link href="https://www.npmjs.com/~aoneahsan">npm</Link>
        </p>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} — Push, Local & In-App Notifications for React + Capacitor`}
      description="Documentation for notification-kit: one API for push notifications, local notifications, and in-app notifications across Web, iOS, and Android in React + Capacitor apps."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <AuthorStrip />
      </main>
    </Layout>
  );
}
