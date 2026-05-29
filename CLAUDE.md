# Picasso — Claude Code working notes

Active program: **PI-4318 (Picasso Modernization + AI Developer Experience)**.
Planning docs: `docs/modernization/`

- Effort estimates: `PI-4318-estimates_final.md`
- Calendar: `PI-4318-timeline_final.md`
- Tickets by track: `PI-4318-tickets-by-track_final.md`
- Migration plan deep dive: `PI-4318-P1-MOD-01-migration-plan.md`
- AI leverage spec (orchestrator design): `PI-4318-ai-leverage-tickets.md`

Active migration tooling: `docs/migration/`
- Orchestrator runbook: `docs/migration/ORCHESTRATOR.md`
- Operational migration plan: `docs/migration/migration-plan.md`
- Run: `pnpm orchestrate --component=<Name>` (or `--tier=N`, `--dry-run`, `--no-merge`)

## Canonical references for Picasso code

When reasoning about Picasso component APIs, code style, or reviewer expectations, consult these in order:

- `PICASSO_COMPONENT_DESIGN_PATTERNS.md` (repo root) — the source-of-truth API spec validated by CI. 16 component-level + 3 form-component rules. Cherry-picked from master onto the modernization branch so the canonical doc travels with every migration PR. Loaded into every migration prompt via contextPack. Re-sync from master with `git checkout master -- PICASSO_COMPONENT_DESIGN_PATTERNS.md` when the doc changes upstream.
- `docs/migration/references/design-patterns-addendum.md` — migration-only delta: existing-violations carve-out (preserve pre-existing rule violations during a library swap) + rule 5 / rule 10 architectural exceptions (Dropdown/OutlinedInput Tier 3.b, StandardProps preservation).
- `docs/migration/references/code-standards.md` — Picasso file structure, naming, JSDoc, ESLint custom rules, test conventions, Tailwind composition. Frequency-based rule strength (≥70% RULE, 30-70% preferred). Loaded into every migration prompt.
- `docs/migration/references/practices.md` — graduated migration patterns (build precondition, visual classification, @base-ui/react idioms, changeset format, tsconfig hygiene). Loaded into every migration prompt. Curated from `lessons-learned.md` via periodic graduation passes.
- `docs/migration/references/_survey-findings.md` — evidence base for the standards docs (implementer scratchpad — NOT loaded into agent context; the `_` prefix signals this).
- `docs/contribution/component-api.md` — compound vs facade patterns, prop-naming principles.
- `docs/contribution/changeset-guidelines.md` — canonical version-bump taxonomy (patch / minor / major) and changelog format. Graduated into `references/code-standards.md §Changeset conventions`.
- `docs/contribution/visual-testing.md` — Happo + responsive component testing (`screenshotBreakpoints: true` on Storybook, `HAPPO_TARGETS` on Cypress). Graduated into `references/practices.md §Responsive component visual testing`.
- `docs/contribution/github-workflow.md` — PR CI job list (Danger / Jest / Lint / Visual Tests / Deploy docs) + commit conventions. Graduated into `references/code-standards.md §CI job pipeline`.
- `docs/contribution/pr_jobs.md` — `@toptal-bot` manual CI re-run commands. Graduated into `references/code-standards.md §"Manual CI override via @toptal-bot"`.
- `docs/contribution/packages-architecture.md` — 4-layer tsconfig + Storybook webpack alias hierarchy. Graduated into `references/code-standards.md §"Build + Storybook tsconfig hierarchy"`.
- `docs/contribution/accessibility.md` — Storybook a11y addon workflow (Violations / Passes / Incompletions tabs). Graduated into `references/practices.md §Accessibility validation`.
- `docs/contribution/unit-testing.md` and `docs/contribution/creating-examples.md` — test and story conventions.
- `docs/contribution/new-component-creation.md` — `pnpm generate:component` scaffolding tool (auto-creates folder, story, styles, test per code-standards.md structure).
- **LEGACY — do NOT use as canonical**: `docs/contribution/css-naming.md` describes MUI v4 + JSS conventions (`root` + `rootFull`/`rootShrink` for variants, `classes` prop pattern). These predate the Tailwind migration. For migrated components, use `references/code-standards.md §Tailwind class composition` instead. The migration agent's `practices.md §"css-naming.md is LEGACY — do not follow"` enforces this.

`docs/migration/references/lessons-learned.md` is now **AUDIT-ONLY** — auto-appended after each successful migration, but NOT in the agent's contextPack. Promoted patterns graduate to `practices.md` (manual pass, ~every 5–10 migrations).

## Code style for orchestrator (`bin/lib/*.ts` and `bin/*.ts`)

(For Picasso component code style — what reviewers expect on migration PRs — see `PICASSO_COMPONENT_DESIGN_PATTERNS.md` (repo root), `docs/migration/references/design-patterns-addendum.md`, and `docs/migration/references/code-standards.md`. This section covers ORCHESTRATOR code only.)

Picasso's ESLint config (root `.eslintrc.js`) extends `@toptal/davinci-syntax` and adds `ssr-friendly` + `eslint-plugin-local-rules`. CI's "Static checks" job lints the WHOLE repo (`pnpm eslint --ext=.ts,.tsx,.js,.jsx .`), so any error in `bin/lib/*.ts` blocks the migration PR's CI. Note: `.eslintignore` excludes `bin/` locally, so reproduce CI's behavior with `--no-ignore` when sanity-checking orchestrator changes.

Rules I have personally hit while editing the orchestrator:

- **`no-empty`**: empty blocks fail. `try { ... } catch {}` is wrong — use `catch { /* ignore */ }` or `catch (_err) {}`.
- **`no-control-regex`**: regex literals containing control chars (e.g. `` for ANSI escape) need an `// eslint-disable-next-line no-control-regex` comment.
- **`max-statements-per-line`**: only one statement per line. Avoid `try { x() } catch {}` on one line.
- **`padding-line-between-statements`** + **`jest-formatting/padding-around-all`**: blank lines required around return, const-after-statement, expect blocks, etc.
- **`max-statements`** / **`complexity`**: arrow-function/method complexity capped (~20/10 default).
- **`func-style`**: prefer expressions over declarations in some contexts.

Before declaring orchestrator changes done, ALWAYS run:

```bash
pnpm eslint --ext=.ts --no-ignore bin/lib/<edited-files>.ts
```

ESLint scoped to bin/lib runs in <2s. Don't ship orchestrator code that fails this. Local migration runs scope lint to the migrating package's src so they don't catch orchestrator-level violations — the safety net is CI, but failing CI on orchestrator-side lint blocks every migration PR until fixed (we hit this in PR #4943 with empty `catch {}` in `orchestrator-core.ts`).

## Review-response posture (sweep mode)

The orchestrator's `--review-sweep` runs in conversational mode (since 2026-05-08). When new reviewer comments arrive on an open `awaiting_review` PR:

- The agent reads the entire PR thread (top-level reviews, line-level comments, reactions on its own past replies)
- Per comment, the agent decides: **HIGH confidence** → edit code + reply with summary; **MEDIUM confidence** → reply with reasoning + proposal + ask for 👍 confirmation, no code change; **LOW confidence** → reply asking for clarification, no code change
- Reactions and follow-up replies on the agent's proposals advance confidence on the next sweep tick

Protocol details: `docs/migration/PROMPT-review-response.md`. Agent has `gh pr comment`, `gh api .../pulls/<n>/comments` (with `in_reply_to`), and reaction-read tools allowlisted for this. Code commits remain orchestrator-owned; the agent only edits + replies.

When in doubt about a suggestion, the agent should propose (MEDIUM) rather than act (HIGH). False MEDIUM costs one extra sweep tick. False HIGH costs a revert.

## `classes` prop handling per tier (locked 2026-05-11)

Cross-tier audit (`docs/migration/decisions/classes-audit.md`) measured each of the 28 components' `classes` API surface — source-level, internal callsites, external consumer usage (with manual `gh search code` textMatches inspection). Audit data drives the per-tier decision:

- **Tier 0** (Button, Backdrop, Badge, Drawer, Slider, Switch, Tabs): `extends Omit<StandardProps, 'classes'>` + destructure `classes: _classes` runtime backstop. `classes` was broken since the @mui/base step; 0 internal/external real usage. Reference: PR #4947 Button.tsx + ButtonBase.tsx.
- **Tier 0 — Modal**: re-verify. External consumers use `<Modal classes={{ closeButton }}>` per audit §6/§9 — may need Tier 3.b treatment (keep narrowed) instead of standard Tier 0 drop.
- **Tier 1 with vestigial classes** (Container, Typography, Notification): drop via `Omit<StandardProps, 'classes'>` + runtime backstop. Audit-verified vestigial (0 internal, 0 external). Bundle into Tier 1 cleanup PR.
- **Tier 1 — FormControlLabel**: KEEP locally narrowed `classes?: { root?, label? }`. Used internally by Switch/Radio/Checkbox.
- **Tier 1 no `classes` API** (FormLabel, Grid, Form, Note, Menu, FormLayout, ModalContext, Utils): no-op.
- **Tier 2** (Checkbox, Radio, Tooltip, FileInput, Popper): `Omit` drop public. Internal MUI plumbing rewrites with the @base-ui/react migration. Audit-verified 0 external real usage.
- **Tier 3.a** (Accordion, Page): `Omit` drop public. Rewrite internal slot-routing on @base-ui/react parts.
- **Tier 3.b** (Dropdown, OutlinedInput): **KEEP locally narrowed `classes?: { ... }`** (Dropdown: `{ popper, content }`; OutlinedInput: `{ input, root }`). Real external consumers depend on these slots — Dropdown 2 callsites, OutlinedInput 4 callsites.

**Agents migrating any component MUST verify per-component** before applying:
1. Read the source — confirm StandardProps extension / local narrowing / body reads of `classes`.
2. Multiline rg internal callsites.
3. Cross-reference with audit §3/§4/§5.
4. If audit contradicts source state → STOP, update audit doc, don't proceed unilaterally.

PROMPT-light.md §5 + PROMPT-heavy.md §5 codify the research-aware decision matrix. `withClasses` helper from `@toptal/picasso-utils` is deprecated.

**End-state target**: once all 28 components migrate, `StandardProps`, `JssProps`, `Classes` removed from `@toptal/picasso-shared`. Dropdown + OutlinedInput permanently retain their locally narrowed `classes?: { ... }`.

Full audit + per-component data: `docs/migration/decisions/classes-audit.md`. Decision matrix: `docs/migration/decisions/classes-shim.md`.

**Design-patterns tension.** `PICASSO_COMPONENT_DESIGN_PATTERNS.md` rule 5 forbids `classes` prop entirely. The Tier 3.b narrowed-`classes` retention on Dropdown + OutlinedInput is a deliberate, audit-backed transition exception — see `docs/migration/references/design-patterns-addendum.md` §"Migration-period architectural exceptions". End-state is full rule 5 compliance once consumers migrate off the narrowed shape.

## Branch hygiene

- **Active orchestrator branch**: `feature/pf-1992-migration-orchestrator` (operator's working branch; worktrees fork from its HEAD)
- **Migration PR target**: `feature/picasso-modernization-temp` (set 2026-05-12). Worktrees still fork from the orchestrator branch's HEAD, so PR diffs may include orchestrator commits not yet on the target.
- **Eventual merge target**: this branch as a whole rolls up into `feature/picasso-modernization` or master after all 28 migrations land
