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

# CLAUDE.md — notification-kit-docs

**Last Updated:** 2026-10-20

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

## Stop-work Git gate

<!-- RULE:stop-work-git-gate v2026-10-20 -->

Before stopping, commit every legitimate change and work-progress checkpoint in this repository and each independent nested repository, fetch and merge the designated upstream, push the documented working branch, then verify an empty worktree and `0 0` ahead/behind. Never stash, discard, reset, rebase, or force-push. If synchronization is blocked, report the exact repository, branch, blocker, and next action instead of calling the work complete. The full workflow remains authoritative in `~/.claude/rules/git-workflow.md`.
