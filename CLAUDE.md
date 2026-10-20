# CLAUDE.md — notification-kit-docs

**Last optimized:** 2026-10-20
**Next routine optimization:** 2026-11-19

## Scope

Public Docusaurus 3 documentation for `notification-kit`. The package source is
`/home/ahsan/Documents/01-code/projects/00-npm-packages-projects/notification-kit`; its `src/` tree and built
declarations are authoritative for every API claim.

| Item | Current value |
|---|---|
| Package documented | `notification-kit@2.1.3` |
| Live site | `https://notification-kit-docs.aoneahsan.com` |
| Hosting | GitHub Pages from `main` |
| Package manager | Yarn 4.17.1 only |
| Node | `>=18`; deployment uses Node 20 |

## Start here

Read the nearest guide pair, the page being changed, the relevant package source, and `sidebars.ts` when
adding or removing a route. Do not infer an API from old prose or historical trackers.

## Commands

```bash
yarn install --immutable
yarn typecheck
yarn build
yarn serve
```

Inspect the exact `build/` output in a controlled browser before pushing a deploy-triggering commit.

## Content rules

- Match public names, types, return values, defaults, platform limits, and examples to package source.
- State that privileged push sends and Firebase topic management require a server.
- Keep examples copyable and use placeholders for every credential or provider identifier.
- Update `docs/changelog.md`, `static/llms.txt`, and `static/llms-full.txt` when their indexed facts change.
- Keep new user-visible UI strings in the site’s established content system.
- Never install, import, vendor, or copy an owner-created client package, including `@perkforce/tool-kit`.

## Publishing

`.github/workflows/deploy-pages.yml` builds and deploys on pushes to `main`. `static/CNAME` owns the custom
domain. After pushing, require a successful Pages run and HTTP 200 responses from the live home page and
every changed route.

## Context record

The root and `docs/` guide pairs were reviewed on 2026-10-20. Obsolete Firebase deployment instructions
were removed because GitHub Pages is the active host. Routine context work is ineligible before 2026-11-19
unless the tree changes materially or an instruction is proven stale.
