# CLAUDE.md — notification-kit-docs

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
| Live URL | https://notification-kit-docs.aoneahsan.com (Firebase Hosting `notification-kit-docs` OR GitHub Pages — both wired; deploy is USER-ONLY) |
| Source package | https://www.npmjs.com/package/notification-kit (private repo `notification-kit`) |
| Sibling project | `/home/ahsan/Documents/01-code/projects/00-npm-packages-projects/notification-kit/` (the library itself) |
| Content tracker | `docs/tracking/notification-kit-docs-content-tracker.json` |
| Build gates | `yarn typecheck` exit 0 · `yarn build` (→ `./build`) exit 0 |

## Critical rules

| Rule | Detail |
|---|---|
| Yarn only | Never `npm install` / `pnpm add`. |
| No dev server in agent runs | The agent runs `yarn build` + `yarn typecheck`; the maintainer runs `yarn start`. |
| Single source of truth | Every API fact MUST come from the `notification-kit` repo's `src/`. No invented method names or parameters. Read the source before documenting it. |
| Honest framing | Say what the library does NOT do (e.g. client-side push send and FCM topic management are server-side only) as clearly as what it does. No fabricated stats. |
| No secrets | This is a PUBLIC repo. Never commit real API keys, VAPID keys, or service-account JSON — use placeholders. |
| One commit per batch | Don't make per-file commits for a docs batch. |
| CLAUDE.md + AGENTS.md sync | Update both at every level when changing rules. Review every 3 days. |

## Verification commands

```bash
yarn typecheck       # tsc --noEmit (must exit 0)
yarn build           # docusaurus build (must exit 0, must produce ./build)
```

## Deploy (USER-ONLY)

- Firebase: `yarn firebase:deploy` (project `notification-kit-docs`).
- GitHub Pages: `.github/workflows/deploy-pages.yml` on push to main (enable in repo Settings → Pages). `static/CNAME` maps the custom domain.
