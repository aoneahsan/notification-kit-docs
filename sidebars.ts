import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Sidebar layout for the notification-kit docs.
 *
 * Every page here is source-accurate against the notification-kit package
 * (https://www.npmjs.com/package/notification-kit). API facts come from the
 * package's `src/` — no invented method names or parameters.
 */
const sidebars: SidebarsConfig = {
  mainSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
        'getting-started/configuration',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'guides/push-notifications',
        'guides/local-notifications',
        'guides/in-app-notifications',
        'guides/channels',
        'guides/permissions',
        'guides/events',
        'guides/react-hooks',
      ],
    },
    {
      type: 'category',
      label: 'Platform Setup',
      collapsed: true,
      items: [
        'platforms/web',
        'platforms/android',
        'platforms/ios',
      ],
    },
    {
      type: 'category',
      label: 'Providers',
      collapsed: true,
      items: [
        'providers/firebase',
        'providers/onesignal',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      collapsed: true,
      items: [
        'reference/api-overview',
        'reference/notification-kit',
        'reference/notifications',
        'reference/react-hooks',
        'reference/config-types',
        'reference/events',
        'reference/utilities',
      ],
    },
    {
      type: 'category',
      label: 'Help',
      collapsed: true,
      items: [
        'help/faq',
        'help/troubleshooting',
        'changelog',
      ],
    },
    {
      type: 'category',
      label: 'About',
      collapsed: true,
      items: ['about-the-author'],
    },
  ],
};

export default sidebars;
