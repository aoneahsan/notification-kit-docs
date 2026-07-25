import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// ---------------------------------------------------------------------------
// notification-kit — Documentation site config
// Author: Ahsan Mahmood (https://aoneahsan.com)
// Source package: https://www.npmjs.com/package/notification-kit
// ---------------------------------------------------------------------------

const SITE_URL = 'https://notification-kit-docs.aoneahsan.com';

const config: Config = {
  title: 'notification-kit Docs',
  tagline:
    'One API for push, local, and in-app notifications across Web, iOS, and Android — for React + Capacitor apps.',
  favicon: 'img/favicon.svg',

  // Production URL — served from Firebase Hosting / GitHub Pages.
  url: SITE_URL,
  baseUrl: '/',

  // GitHub metadata (drives OG tags + edit-this-page links)
  organizationName: 'aoneahsan',
  projectName: 'notification-kit-docs',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',

  // SEO + AI-citability head tags. The JSON-LD payloads (WebSite,
  // Organization, SoftwareSourceCode / TechArticle) help Google Rich
  // Results, Perplexity, ChatGPT, and Claude extract structured entity
  // data when citing this documentation.
  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'canonical',
        href: `${SITE_URL}/`,
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'notification-kit Docs',
        href: `${SITE_URL}/sitemap.xml`,
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'application-name',
        content: 'notification-kit Docs',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'apple-mobile-web-app-title',
        content: 'notification-kit Docs',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'theme-color',
        content: '#6366f1',
      },
    },
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'notification-kit Documentation',
        url: SITE_URL,
        description:
          'Documentation for notification-kit, a unified notification library for React + Capacitor apps. One API for push, local, and in-app notifications across Web, iOS, and Android. Author: Ahsan Mahmood.',
        inLanguage: 'en',
        publisher: {
          '@type': 'Person',
          name: 'Ahsan Mahmood',
          url: 'https://aoneahsan.com',
          email: 'aoneahsan@gmail.com',
          sameAs: [
            'https://linkedin.com/in/aoneahsan',
            'https://github.com/aoneahsan',
            'https://www.npmjs.com/~aoneahsan',
          ],
        },
        license: 'https://opensource.org/licenses/MIT',
      }),
    },
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: 'notification-kit',
        codeRepository: 'https://github.com/aoneahsan/notification-kit',
        programmingLanguage: 'TypeScript',
        runtimePlatform: 'React, Capacitor, Web, iOS, Android',
        url: 'https://www.npmjs.com/package/notification-kit',
        author: {
          '@type': 'Person',
          name: 'Ahsan Mahmood',
          url: 'https://aoneahsan.com',
        },
        description:
          'A unified notification library for React + Capacitor apps. One API for push notifications (Firebase / OneSignal), local notifications, and in-app notifications across Web, iOS, and Android. Zero required dependencies, dual ESM + CJS, MIT-licensed.',
        license: 'https://opensource.org/licenses/MIT',
      }),
    },
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Ahsan Mahmood',
        alternateName: 'aoneahsan',
        url: 'https://aoneahsan.com',
        email: 'aoneahsan@gmail.com',
        sameAs: [
          'https://linkedin.com/in/aoneahsan',
          'https://github.com/aoneahsan',
          'https://www.npmjs.com/~aoneahsan',
          'https://aoneahsan.com',
        ],
        founder: {
          '@type': 'Person',
          name: 'Ahsan Mahmood',
        },
      }),
    },
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  trailingSlash: false,

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // `docs/` is BOTH the published content dir and the home of the
          // fixed-path internal file docs/MANUAL-TASKS.md. Keep the path (the
          // global rule fixes it) but never publish it — this repo is public.
          // NOTE: `exclude` REPLACES the plugin defaults, so they are restated.
          exclude: [
            '**/_*.{js,jsx,ts,tsx,md,mdx}',
            '**/_*/**',
            '**/*.test.{js,jsx,ts,tsx}',
            '**/__tests__/**',
            'MANUAL-TASKS.md',
          ],
          routeBasePath: '/',
          editUrl: 'https://github.com/aoneahsan/notification-kit-docs/edit/main/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
          breadcrumbs: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.7,
          lastmod: 'date',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.svg',
    metadata: [
      {
        name: 'description',
        content:
          'Documentation for notification-kit — a unified notification library for React + Capacitor apps. One API for push, local, and in-app notifications across Web, iOS, and Android. Maintained by Ahsan Mahmood.',
      },
      {
        name: 'keywords',
        content:
          'notification-kit, capacitor notifications, react notifications, push notifications, local notifications, in-app notifications, firebase cloud messaging, onesignal, capacitor push, fcm, apns, typescript notifications, ios notifications, android notifications, web push',
      },
      { name: 'author', content: 'Ahsan Mahmood' },
      {
        name: 'robots',
        content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:creator', content: '@aoneahsan' },
      { name: 'twitter:site', content: '@aoneahsan' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'notification-kit Docs' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'article:author', content: 'Ahsan Mahmood' },
    ],
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: 'notification-kit',
      logo: {
        alt: 'notification-kit logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo.svg',
        width: 32,
        height: 32,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'mainSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/getting-started/quick-start',
          label: 'Quick Start',
          position: 'left',
        },
        {
          to: '/reference/api-overview',
          label: 'API',
          position: 'left',
        },
        {
          to: '/about-the-author',
          label: 'Author',
          position: 'right',
        },
        {
          href: 'https://www.npmjs.com/package/notification-kit',
          label: 'npm',
          position: 'right',
        },
        {
          href: 'https://github.com/aoneahsan/notification-kit',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Introduction', to: '/intro' },
            { label: 'Installation', to: '/getting-started/installation' },
            { label: 'Quick Start', to: '/getting-started/quick-start' },
            { label: 'API Reference', to: '/reference/api-overview' },
          ],
        },
        {
          title: 'Project',
          items: [
            { label: 'npm package', href: 'https://www.npmjs.com/package/notification-kit' },
            { label: 'Source (GitHub)', href: 'https://github.com/aoneahsan/notification-kit' },
            { label: 'Docs source', href: 'https://github.com/aoneahsan/notification-kit-docs' },
            { label: 'Issues', href: 'https://github.com/aoneahsan/notification-kit/issues' },
          ],
        },
        {
          title: 'Built by Ahsan Mahmood',
          items: [
            { label: 'aoneahsan.com', href: 'https://aoneahsan.com' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/aoneahsan' },
            { label: 'GitHub', href: 'https://github.com/aoneahsan' },
            { label: 'npm packages', href: 'https://www.npmjs.com/~aoneahsan' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ahsan Mahmood. Built with Docusaurus. notification-kit is MIT-licensed.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'typescript', 'jsx', 'tsx', 'kotlin', 'swift', 'diff'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
