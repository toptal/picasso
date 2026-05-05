# Cowork session handoff — PI-4318 Picasso Modernization

Paste this whole file as your first message in the new Cowork instance.

---

## Folder & user

- **Workspace folder (already mounted):** `picasso` — the user has selected the Picasso monorepo. Treat that as the current working directory for everything.
- **User:** Vedran (`vedran.ivanac@gmail.com`).
- **Project:** [Toptal] Picasso design system monorepo. Yarn workspaces + Lerna 8 + Nx 21.

## What we're working on

**PI-4318 — Picasso Modernization + AI Developer Experience.** A program-increment plan with four parallel tracks:

1. **Modernization** — Migrate Picasso from three source stacks (MUI v4 / `@material-ui/core` 4.12.4 + JSS via `makeStyles`/`createStyles`/`withStyles` + `@mui/base`) to **`@base-ui/react`** ([base-ui.com](https://base-ui.com/react/overview/quick-start)) + **Tailwind 4**. Target stack: `@base-ui/react` for primitives, `@toptal/base-tailwind` + `@toptal/picasso-tailwind` + `@toptal/picasso-tailwind-merge` for styling. Two paths: heavy (MUI v4 + JSS components, full rewrite) and light (`@mui/base` components, package swap + API alignment per PR #4906 baseline). Note: `@mui/base` is `@base-ui/react`'s predecessor and is also a migration source, NOT the target.
2. **Agent Experience** — `.picasso/` rules, Skills (`picasso-component`, `picasso-page`, `picasso-review`, `picasso-migration`), org-wide AI dev experience.
3. **Figma Design-to-Code** — Figma Make + Code Connect coverage (75/75 components).
4. **Maestro Integration** — Figma Middleware PoC → production, default library = Picasso.

## Files (all under `docs/modernization/` in the picasso folder)

| File | Purpose |
|---|---|
| `PI-4318-phases.md` | High-level 3-phase roadmap (Phase 1 pilot/gated, Phase 2 execute, Phase 3 rollout). |
| `PI-4318-tickets.md` | Phase-organized ticket list (3 epics — one per phase, 29 stories total). |
| `PI-4318-tickets-by-track.md` | Track-organized ticket list (4 epics — one per track, 29 stories total). Same stories as `tickets.md`, different epic grouping. |
| `PI-4318-P1-MOD-01-migration-plan.md` | Deep dive deliverable for ticket P1-MOD-01. The `@base-ui/react` + Tailwind migration plan with two-path model. Includes per-component tier table (Tier 0 light, Tier 1 cleanup, Tier 2-3 heavy, Tier 4 siblings, Tier 5 provider), sequence, AI prompts, risk register. |
| `PI-4318-technical-ideation.md` | Original brain-dump that fed the above. |
| `pi-description-proposed.md`, `pi-metrics-proposal.md`, `pi-ticket-review.md` | Earlier drafts / supporting material. |

**The two ticket docs are kept in sync** — every story exists in both, with the same ID, summary, blockers, and acceptance criteria. When editing a story, edit both.

## Story ID scheme

`P{phase}-{TRACK}-{n}` — e.g. `P2-MOD-03`. Tracks: `MOD`, `AIC` (Agent), `FIG` (Figma), `MAE` (Maestro). Story IDs are anchors for cross-references inside the docs and (planned) Jira keys.

## Current ticket inventory

**Phase 1 — gated pilot (10 stories):** P1-AIC-01..04, P1-FIG-01..03, P1-MOD-01, P1-MOD-02, P1-MAE-01.
**Phase 2 — execute (11 stories):** P2-MOD-01..06, P2-AIC-01, P2-FIG-01, P2-FIG-02, P2-MAE-01, P2-MAE-02.
**Phase 3 — rollout (8 stories):** P3-MOD-01, P3-MOD-02, P3-AIC-01..03, P3-FIG-01, P3-MAE-01, P3-MAE-02.

**Modernization track Phase 2 chain (recently split — important):**

- `P2-MOD-01` — Migrate `packages/base/*` components (XL, blocks 02/03/04/06)
- `P2-MOD-02` — Migrate `@toptal/picasso-charts` (S, blocked by 01)
- `P2-MOD-03` — Migrate `@toptal/picasso-query-builder` 11 components (L, blocked by 01)
- `P2-MOD-04` — Migrate `@toptal/picasso-rich-text-editor` 8 components (L, blocked by 01)
- `P2-MOD-05` — Decommission `@toptal/picasso-provider` MUI v4 runtime + remove root peer-dep (canary) (L, blocked by 01..04)
- `P2-MOD-06` — Define product migration plans + codemods (L, blocked progressively by 01..05)

`P3-MOD-01` is blocked by all six. `P2-FIG-02` is blocked by `P1-FIG-01` + `P2-MOD-01..04`.

## Repo gap-analysis findings (already baked into the migration plan)

- **22 packages** declare `@material-ui/core` (not 17 as the original draft claimed). Includes 17 base packages + `picasso-provider`, `picasso-charts`, `picasso-query-builder`, `picasso-rich-text-editor`, `picasso` (aggregator).
- **`picasso-provider`** is the theme backbone — 22 MUI source files, 9 JSS files. Treated as Tier 5 (last) because its DoD is package-level (whole-repo Storybook + Portal smoke).
- **Type-only MUI v4 leaks** in already-"migrated" base packages: `Container` (`PropTypes`), `OutlinedInput` (`InputBaseComponentProps`), `Notification` (`SnackbarOrigin`).
- Sibling packages migration count: charts = 1 (LineChart), query-builder = 11 components, RTE = 8 components.
- `~38 migration units + 1 provider/runtime rewrite` is the total scope per the plan.

## Conventions in the docs

- **Estimates:** T-shirt — XS/S/M/L/XL.
- **Phase labels (track doc only):** `phase-1` | `phase-2` | `phase-3` plus `gated` | `non-gating-parallel` | `post-gate`. Track labels: `track-modernization`, `track-agent-experience`, `track-figma-design-to-code`, `track-maestro-integration`.
- **Per-story header line in `tickets.md`:** `**Track:** ... · **Estimate:** ... · **Blocked by:** ... · **Blocks:** ...`
- **Per-story header line in `tickets-by-track.md`:** `**Phase:** ... · **Labels:** ... · **Estimate:** ... · **Blocked by:** ... · **Blocks:** ...`
- Anchor links between docs use GitHub-style slugs (lowercase, hyphens). `PI-4318-phases.md#phase-2--execute--6-8-weeks-post-gate` etc.
- Both ticket docs end with a `# Summary` block with story counts and a `## Review checklist`.

## Recent state of work (as of 2026-04-27)

Just finished a 6-ticket split of the original P2-MOD-01 ("Migrate Picasso components"). The work that's done:

1. ✅ Track renames: Figma → "Figma Design-to-Code", Maestro → "Maestro Integration".
2. ✅ Cowork context updated to point at `docs/modernization/` paths.
3. ✅ Migration plan validated against repo, gap analysis applied (22 packages, sibling packages, type-only leaks, Tier 4/5 added).
4. ✅ P2-MOD-01 split into six stories (`P2-MOD-01..06`) in both ticket docs, with full dependency chain.
5. ✅ Downstream blockers updated: `P3-MOD-01`, `P2-FIG-02`.
6. ✅ Summary counts and Phase 2 row in `phases.md` updated.

## Open / not-yet-started

- **Jira creation.** The docs are review-ready but no Jira issues have been created yet. The Atlassian MCP is connected (`mcp__ccdcc509-...__createJiraIssue` etc.) — we have not used it. When ready, the user will likely want to script the bulk creation.
- **`pi-description-proposed.md` / `pi-metrics-proposal.md`** haven't been re-validated against the renumbered ticket set — sweep them when you next open them.
- **Verify GitHub anchor slugs** for the new `Tier 4 — sibling packages outside packages/base` and `Tier 5 — runtime / provider decommission` headings in the migration plan if the doc is ever rendered on a GitHub-rendered surface.

## House rules picked up over the session

- The user prefers package-boundary ticket splits (one ticket per Yarn workspace package) over technology-boundary splits — clear ownership per ticket.
- Story IDs are kept stable when possible (anchor preservation). When inserting new stories, renumber the *trailing* story rather than shifting the head ID.
- Both ticket docs MUST stay in sync. When you edit one, edit the other.
- Validate scope claims against the actual repo (grep for `@material-ui/core`, `makeStyles`, `createStyles`, `withStyles` across `packages/`, not just `packages/base/`).
- Don't add cute prose/emoji to ticket docs — they're feeding Jira.

## Useful repo-grep recipes (already in the migration plan appendix)

```bash
# Packages still declaring MUI v4
rg -l '"@material-ui/core"' packages/*/package.json

# JSS usage across the monorepo
rg -l "from ['\"]@material-ui/core/styles['\"]" packages/

# Per-base-package MUI tally
for d in packages/base/*/; do echo "$d $(rg -c '@material-ui/core' $d 2>/dev/null | wc -l)"; done
```

---

When you start in the new Cowork instance, your first action should be to `Read` the two ticket docs and the migration plan to load them into context, then ask me what I want to work on next.
