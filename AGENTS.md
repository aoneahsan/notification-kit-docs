# AGENTS.md — notification-kit-docs

Public Docusaurus documentation site for the `notification-kit` npm package.

> Last Updated: 2026-06-23

## Task Speed Over Docs (IRON-SOLID — BEHAVIORAL)

Finish the real task fast + correctly FIRST; docs/trackers/sync are a footnote (≤~20% of effort) — never let recording outpace the fix. HARD STOP when doc work outpaces the change → ship, then ONE line if anything. No new summary/status/completion files unless asked; edit/delete over add; delete stale docs. Full rule: `~/.claude/CLAUDE.md`.

## Identity

| Key | Value |
|---|---|
| Repo | `notification-kit-docs` (PUBLIC) |
| Type | Docusaurus 3 documentation site (classic preset) |
| Package manager | yarn (NEVER npm/pnpm) |
| Node | >=18 |
| Author | Ahsan Mahmood (aoneahsan@gmail.com) |
| Live URL | https://notification-kit-docs.aoneahsan.com (Firebase Hosting OR GitHub Pages; deploy is USER-ONLY) |
| Source package | https://www.npmjs.com/package/notification-kit (private repo `notification-kit`) |
| Sibling project | `/home/ahsan/Documents/01-code/projects/00-npm-packages-projects/notification-kit/` |
| Content tracker | `docs/tracking/notification-kit-docs-content-tracker.json` |
| Build gates | `yarn typecheck` exit 0 · `yarn build` exit 0 |

## Critical rules

| Rule | Detail |
|---|---|
| Yarn only | Never `npm install` / `pnpm add`. |
| No dev server in agent runs | The agent runs `yarn build` + `yarn typecheck`; the maintainer runs `yarn start`. |
| Single source of truth | Every API fact MUST come from the `notification-kit` repo's `src/`. No invented method names or parameters. |
| Honest framing | Say what the library does NOT do (client-side push send + FCM topic management are server-side only) as clearly as what it does. No fabricated stats. |
| No secrets | PUBLIC repo — never commit real API/VAPID keys or service-account JSON; use placeholders. |
| One commit per batch | No per-file commits for a docs batch. |
| CLAUDE.md + AGENTS.md sync | Update both at every level when changing rules. Review every 3 days. |

## Verification commands

```bash
yarn typecheck
yarn build
```

## Deploy (USER-ONLY)

- Firebase: `yarn firebase:deploy` (project `notification-kit-docs`).
- GitHub Pages: `.github/workflows/deploy-pages.yml` on push to main. `static/CNAME` maps the custom domain.

## Gitignore Hygiene (IRON-SOLID)
`.gitignore` stays current with the project structure — ignore only recoverable artifacts (build/`dist`/`www`/`node_modules`/logs/caches/IDE), never lose source. Custom rules always present: `*.ignore.*`, `project-record-ignore/`. This is a **PUBLIC** repo -> secrets/`.env`/keystores are NEVER tracked.
Full rule + private/public protocol: `~/.claude/rules/project-config.md`.
Gitignore Last Verified: 2026-06-24
