## 🔴 CRITICAL — PROJECT FROZEN (2026-10-21)

**This is an idea project. It was frozen on 2026-10-21 at commit `5403c06ee1b7b2f68f550a042d7540b08c5b4c2d` on branch `main`.**

- Do **NOT** edit, fix, upgrade, build, deploy, document or "improve" anything in this repository.
- It will only ever be **rebuilt from scratch** as `~/Documents/01-code/production-projects/notification-kit-root/`
  (this code cloned beside it as `notification-kit-old/` for reference), with a click dummy, a Story Bible, a Supabase
  backend and a docs site — and **only when the owner types, in ALL CAPS, an explicit request naming this
  project**.
- Any other request to work here is refused. Rule: `~/.claude/rules/idea-projects-frozen.md`.
- Ledger: private repo `aoneahsan/projects-finalization-record` → `idea-projects/FREEZE-LEDGER.md`.

---

# notification-kit docs

Public documentation for [`notification-kit`](https://www.npmjs.com/package/notification-kit), a unified
notification library for React and Capacitor applications.

- **Live site:** <https://notification-kit-docs.aoneahsan.com>
- **Package source:** <https://github.com/aoneahsan/notification-kit>
- **npm package:** <https://www.npmjs.com/package/notification-kit>
- **Package version documented:** `2.1.3`

## Local work

```bash
yarn install --immutable
yarn typecheck
yarn build
yarn serve
```

The production build is written to `build/`. The site deploys from `main` through
`.github/workflows/deploy-pages.yml`; `static/CNAME` preserves the custom domain.

## Structure

| Path | Purpose |
|---|---|
| `docs/` | Guides, platform setup, providers, API reference, help, and changelog |
| `src/` | Homepage and shared theme styles |
| `static/` | Search and crawler files, branding, CNAME, and security contact |
| `docusaurus.config.ts` | Site metadata, navigation, plugins, and theme settings |
| `sidebars.ts` | Documentation navigation |

## Source of truth

Verify API names, types, behavior, and limitations against the package repository’s `src/` and built
declarations. Client-side push sending and Firebase topic management remain server-side operations. Never
place provider credentials or private keys in this public repository.

## Publishing

A push to `main` runs the GitHub Pages workflow. Before pushing, run the immutable install, typecheck, and
production build, then inspect the exact build in a controlled browser. After the workflow succeeds, verify
the live home page and changed routes on the custom domain.

Built by [Ahsan Mahmood](https://aoneahsan.com) and released under the MIT License.
