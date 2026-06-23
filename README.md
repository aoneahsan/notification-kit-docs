# notification-kit-docs

Public documentation site for the [`notification-kit`](https://www.npmjs.com/package/notification-kit) npm package — a unified notification library for React + Capacitor apps.

- **Live site**: https://notification-kit-docs.aoneahsan.com
- **Docs source**: this repo (public)
- **Package source (private)**: https://github.com/aoneahsan/notification-kit
- **npm package**: https://www.npmjs.com/package/notification-kit
- **Author**: [Ahsan Mahmood](https://aoneahsan.com)

Built with [Docusaurus 3](https://docusaurus.io/). Deployable to Firebase Hosting or GitHub Pages.

---

## Local development

```bash
yarn install
yarn start          # dev server at http://localhost:5962
yarn build          # production build into ./build
yarn serve          # preview the production build at http://localhost:5963
yarn typecheck      # TypeScript-only check, no emit
```

> Per the workspace convention, the agent does not run the dev server — the maintainer runs and tests. `yarn build` + `yarn typecheck` are the verification gates.

## Project structure

```
notification-kit-docs/
├── docs/                    # Markdown content (the actual docs)
│   ├── intro.md
│   ├── getting-started/     # installation, quick-start, configuration
│   ├── guides/              # push, local, in-app, channels, permissions, events, react-hooks
│   ├── platforms/           # web, android, ios
│   ├── providers/           # firebase, onesignal
│   ├── reference/           # complete API reference
│   ├── help/                # faq, troubleshooting
│   ├── changelog.md
│   └── about-the-author.md
├── src/                     # homepage + theme CSS
├── static/                  # robots.txt, llms.txt, security.txt, CNAME, images
├── docusaurus.config.ts
├── sidebars.ts
├── firebase.json + .firebaserc   # Firebase Hosting config
└── .github/workflows/deploy-pages.yml  # GitHub Pages deploy
```

## Single source of truth

Every API fact in these docs comes from the `notification-kit` package source (`src/`). No invented method names or parameters. When the package's public API changes, update the matching reference page in the same pass.

## Deploy

Two hosting options are wired:

- **Firebase Hosting**: `yarn firebase:deploy` (needs the `notification-kit-docs` Firebase project + your login).
- **GitHub Pages**: the `deploy-pages.yml` workflow builds and publishes `./build` on push to `main`. Enable it under repo Settings → Pages → Source = "GitHub Actions". The `static/CNAME` file maps the custom domain.

Both are USER-ONLY actions (they need your credentials / DNS access).

---

Built by [Ahsan Mahmood](https://aoneahsan.com) · MIT-licensed.
