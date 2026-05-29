# PF-1992 — Migration plan + autonomous-loop infrastructure

**Estimate:** 4–5 days · **Branch:** `pf-picasso-modernization-planning` (current) → cut a feature branch off it for the PR · **Phase:** 1 (non-gating parallel)

## Context

PI-4318 needs to migrate ~38 components and the `picasso-provider` runtime from MUI v4 + JSS to Base UI + Tailwind. Manual orchestration of that many PRs is a non-starter, so PF-1994/2024/2025 will be driven by an autonomous agent that picks components from a queue, runs gates locally, opens PRs via `gh`, and merges on human approval. **PF-1992 builds the infrastructure that agent rides on** — the migration plan content, the gate/diff scripts, the manifest, the orchestrator runner, and a sandboxed end-to-end validation that proves the loop works before a single Tier 1 component is touched.

The detailed design already exists ([`docs/modernization/PI-4318-P1-MOD-01-migration-plan.md`](docs/modernization/PI-4318-P1-MOD-01-migration-plan.md), [`docs/modernization/PI-4318-ai-leverage-tickets.md:19-285`](docs/modernization/PI-4318-ai-leverage-tickets.md)). PF-1992 is **execution of that spec**, not design. Per v11 scoping ([`docs/modernization/PI-4318-tickets-by-track.md:86`](docs/modernization/PI-4318-tickets-by-track.md)), three things explicitly **moved out** of PF-1992: the agentic Code Connect generator (→ PF-2005), the BASE audit script (→ PF-2006), and the 5-page measurement protocol (→ PF-2000). Don't build them here.

## Acceptance criteria mapped to deliverables

From [`docs/modernization/PI-4318-tickets-by-track.md:88-98`](docs/modernization/PI-4318-tickets-by-track.md):

1. ✅ `docs/migration/migration-plan.md` committed — porting from `PI-4318-P1-MOD-01-migration-plan.md`
2. ✅ Top-level plan with complexity tiering for all 75 components — §3 of the deep-dive (already drafted)
3. ✅ Per-component plan template + 2–3 worked examples + per-component plans for all 7 Tier 1 — new files
4. ✅ Testbed setup documented — §6 of the deep-dive ports into `ORCHESTRATOR.md` + `migration-plan.md`
5. ✅ AI migration prompt — `PROMPT.md` (v1 draft already in deep-dive §5.2)
6. ✅ Risk register + rollback strategy — §8 of deep-dive
7. ✅ Autonomous-loop scaffolds — `bin/migration-orchestrator.ts`, `bin/migration-gate.sh`, `bin/migration-diff.sh`, manifest schema, `ORCHESTRATOR.md`, `gh` auth (already done — see Verification §3)
8. ✅ Sandboxed Note migration validates orchestrator end-to-end
9. ✅ PF-1992 PR ships through full Picasso CI + standard reviewer approval
10. ✅ Reviewed by ≥1 engineer outside the pilot team

## Repo state grounding (verified just now)

- `bin/`: existing pattern is `.mjs` (Node ESM) and `.js`. **Decision:** orchestrator is `bin/migration-orchestrator.ts`, run via `tsx` (already a transitive dep — most davinci tooling uses it). Shebang `#!/usr/bin/env -S yarn tsx`.
- `docs/migration/`: **does not exist** — created in this ticket.
- Note canary state: `Note.tsx` is 38 LOC, source has zero MUI imports, but `packages/base/Note/package.json` still lists `@material-ui/core: 4.12.4` in `peerDependencies` and caps React peer at `<19.0.0`. Migration scope = peer-dep drop + React cap lift. **This is intentionally minimal — the goal is to validate the orchestrator's wiring (branch, gate, gh PR, CI poll, merge), not the migration logic itself.**
- Root scripts: `happo`, `test:integration` (cypress component), `test:unit` (jest), `tsc:all`, `lint`, `typecheck` all exist. **No `react19` script** — see §Open decisions.
- `gh` CLI: installed (v2.86.0), already authenticated as `vedrani` with `repo` scope. PR create/merge will work; the deliverable is a 2-line note in `ORCHESTRATOR.md` documenting the auth pattern, not setup work.
- Figma MCP: tools `mcp__Figma__*` are exposed in this session — verification = a single `get_metadata` call against a known design-system file, results pasted into `ORCHESTRATOR.md`. Not load-bearing for PF-1992 itself; verified now to unblock PF-2005 later.

## File tree (what gets committed)

```
docs/migration/
├── migration-plan.md                    # ports PI-4318-P1-MOD-01-migration-plan.md
├── PROMPT.md                            # canonical migration prompt (deep-dive §5.2)
├── ORCHESTRATOR.md                      # runbook for the agent loop
├── manifest.json                        # 36 components seeded, all status="queued"
├── manifest.schema.json                 # JSON schema for the manifest
├── reference/
│   ├── Button.tsx                       # copy from packages/base/Button/src/Button/
│   ├── Button-styles.ts
│   ├── Button-package.json
│   └── Switch.tsx                       # copy from packages/base/Switch/src/Switch/
├── rules/
│   ├── styling.md
│   ├── api-preservation.md
│   └── jss-to-tailwind-crib.md
├── tokens/
│   └── picasso-tailwind-tokens.md       # extracted from picasso-tailwind preset
└── components/
    ├── _README.md                       # template + how to author a per-component plan
    ├── Note.md                          # canary
    ├── Form.md
    ├── FormLabel.md
    ├── FormLayout.md
    ├── ModalContext.md
    ├── Typography.md
    └── Utils.md

bin/
├── migration-gate.sh                    # build → tsc → lint → jest → cypress → happo → react19 (stub)
├── migration-diff.sh                    # prop-surface diff, import diff, Happo summary
└── migration-orchestrator.ts            # the agent runner (tsx)

package.json                             # add: "migrate:component": "bin/migration-gate.sh && bin/migration-diff.sh"
```

CLAUDE.md (currently untracked) gets added in this PR with one extra line pointing at `docs/migration/ORCHESTRATOR.md`.

## Build sequence

### Day 1 — Plan content + scaffolding

1. Create `docs/migration/` and port `PI-4318-P1-MOD-01-migration-plan.md` → `docs/migration/migration-plan.md`. Replace the `packages/base/<NAME>` placeholders with concrete numbers from §3. Trim the "open decisions" section to only the ones still open at this point.
2. Author `PROMPT.md` (lift §5.2 verbatim; iterate later).
3. Author `rules/styling.md`, `rules/api-preservation.md`, `rules/jss-to-tailwind-crib.md` (lift §5.3).
4. Generate `tokens/picasso-tailwind-tokens.md` by reading `packages/picasso-tailwind/src/**` and `packages/base-tailwind/src/**` config exports — one section per token category (color, spacing, typography, screens). Don't hand-write; script it as a one-shot.
5. Copy `Button.tsx`, `Button/styles.ts`, `Button/package.json`, `Switch.tsx` into `reference/`.

### Day 2 — Per-component plans + manifest

6. Write `components/_README.md` (template based on AI-leverage-tickets §Per-component plan structure).
7. Write 7 Tier 1 per-component plans. **Use the agent for first drafts** — feed each component's source + the template into a Claude run, hand-edit the gotchas section. Each plan is ~30 lines.
8. Author `manifest.json` with all 36 components from migration plan §3 (17 base + 11 query-builder + 8 RTE). Initial status: `queued` for Tier 1, `blocked` for everything else (with explicit `depends_on`). Author `manifest.schema.json` covering: tier (1–5), status (queued / in_progress / done / needs_human / blocked), pr (URL or null), iterations (int), branch, depends_on (string[]), merged_at (ISO).

### Day 3 — Gate + diff scripts

9. `bin/migration-gate.sh <Name>`: bash script, fast-fail order per migration plan §4.3. Each stage logs to `migration-runs/<date>/<Name>/<stage>.log`. Composite exit code is the source of truth. **React 19 stage is a stub:** if `yarn test:react19` script is absent, log "react19 smoke pending (PF-1994)" and exit 0. This unblocks PF-1992 without forcing a half-built React 19 setup; PF-1994 wires the real smoke as part of its first migration.
10. `bin/migration-diff.sh <Name>`: bash + small Node helper. Captures pre-migration `tsc --declaration --emitDeclarationOnly` snapshot in `/tmp/pre-<Name>` (called before the migration), then post-migration declaration, runs a structural diff (using `typescript` programmatically), and emits the markdown report shape from migration plan §4.4. Import diff is `git diff --name-only` + grep. Happo summary is parsed from `migration-runs/<date>/<Name>/happo.log`.
11. Wire root `package.json` `"migrate:component"` script.

### Day 4 — Orchestrator runner

12. `bin/migration-orchestrator.ts`: ~300–400 lines, single file, `tsx`-runnable. CLI: `migration-orchestrator [--tier=N] [--component=Name] [--dry-run] [--no-merge]`. Implements the 14-step loop from `PI-4318-ai-leverage-tickets.md:152-199`. Sub-modules inline:
    - `manifest`: read/write/lock with file mutex (use `proper-lockfile` or simple `.lock` file).
    - `agent`: shells out to `claude` CLI with the prompt pack assembled per migration plan §5.1. Writes the prompt + context to a temp file, invokes `claude -p < prompt.txt` non-interactively, captures the conversation. (Or accepts `--agent=claude|cursor|codex` so it's tool-agnostic — see Open decisions.)
    - `gh`: thin wrapper around `gh pr create`, `gh pr view --json …`, `gh pr merge --squash --auto`, `gh pr comment`.
    - `gate`: spawns `bin/migration-gate.sh`, captures stdout/stderr to log, returns exit code + path-to-report.
    - `iterations`: enforces hard cap of 3 per migration plan §4.6.
    - `escalate`: writes `status: needs_human` + reason to manifest, prints a standard escalation block, exits cleanly.
13. `ORCHESTRATOR.md`: runbook. Sections: how to start (`yarn orchestrate --tier=1`), kill-switch, sandbox mode, manifest schema reference, `gh` auth requirements, escalation handling, expected output paths. Pulls heavily from AI-leverage-tickets §Trust + safety.

### Day 5 — Sandboxed Note validation + PR

14. Run the orchestrator end-to-end on Note in sandbox mode: `bin/migration-orchestrator.ts --component=Note --no-merge`. Expected outcome:
    - Branch `migrate-Note` created.
    - Source unchanged (Note.tsx is already MUI-clean).
    - `packages/base/Note/package.json` peer-dep `@material-ui/core` removed; React peer cap lifted to `>=16.12.0`.
    - Gates green (build, tsc, lint, jest, cypress, happo all pass; react19 stub no-ops).
    - Diff report shows: prop surface unchanged, imports unchanged, package.json delta only.
    - PR opened via `gh pr create`. Manifest updated `status=in_progress, pr=<URL>`.
    - Orchestrator stops at sandbox boundary (no auto-merge).
15. Hand-review the PR, merge it manually as a Tier 1 component. Update manifest `status=done`. The Note PR's commit history + the orchestrator log are evidence the loop works — paste the log path into the PF-1992 PR description.
16. Open the PF-1992 PR off the current planning branch with the full PF-1992 deliverable. Standard CI + Happo + reviewer approval. **One reviewer must be outside the pilot team** (acceptance criteria item).

## Critical files to create/modify

- `docs/migration/migration-plan.md` (new, ~600 lines, ported from existing deep-dive)
- `docs/migration/PROMPT.md` (new, ~80 lines)
- `docs/migration/ORCHESTRATOR.md` (new, ~150 lines)
- `docs/migration/manifest.json` + `manifest.schema.json` (new)
- `docs/migration/components/{_README, Note, Form, FormLabel, FormLayout, ModalContext, Typography, Utils}.md` (8 new files)
- `docs/migration/{rules/*, reference/*, tokens/*}` (8 new files)
- `bin/migration-gate.sh`, `bin/migration-diff.sh` (new shell)
- `bin/migration-orchestrator.ts` (new TS, ~400 lines)
- `package.json` (modify: add `migrate:component` and `orchestrate` scripts; add `tsx` to devDeps if not transitive — verify first)
- `packages/base/Note/package.json` (modify in the **Note canary PR**, not in PF-1992 itself: drop MUI peer, lift React cap)
- `CLAUDE.md` (modify: add pointer to `docs/migration/ORCHESTRATOR.md`)

## Reuse, not reinvention

- Migration plan content: port from `docs/modernization/PI-4318-P1-MOD-01-migration-plan.md` ([694 lines, fully drafted](docs/modernization/PI-4318-P1-MOD-01-migration-plan.md)). Don't rewrite — re-home and tighten.
- Prompt: lift `PI-4318-P1-MOD-01-migration-plan.md:382-429` verbatim as `PROMPT.md` v1.
- Rules: lift `:436-472` into the three rule files.
- Orchestrator loop: lift `PI-4318-ai-leverage-tickets.md:152-199` as the spec block at the top of `migration-orchestrator.ts` and `ORCHESTRATOR.md`.
- Reference components: copy from `packages/base/Button/src/Button/{Button.tsx, styles.ts, package.json}` and `packages/base/Switch/src/Switch/Switch.tsx`. No edits.
- `bin/generate-docs.mjs` is the closest in-repo precedent for a multi-stage Node CLI; mirror its module split style for the orchestrator's sub-modules.

## Verification (end-to-end)

1. **Plan content review:** `git diff master -- docs/migration/` shows all listed files; one engineer outside the pilot team reads `migration-plan.md` and `ORCHESTRATOR.md` cold and approves.
2. **Gate script smoke:** `bin/migration-gate.sh Note` runs all 7 stages green on a clean tree, writes `migration-runs/<today>/Note/report.md`.
3. **Diff script smoke:** `bin/migration-diff.sh Note` against a no-op edit produces a "no changes" report. Against a deliberate prop rename in a throwaway branch, produces a `[RENAMED]` line.
4. **Orchestrator dry run:** `bin/migration-orchestrator.ts --component=Note --dry-run` prints the planned 14-step sequence, touches no files, opens no PRs.
5. **Sandbox run:** `bin/migration-orchestrator.ts --component=Note --no-merge` completes through PR creation. Manual inspection of `migrate-Note` branch shows the package.json delta and nothing else. PR opens. CI passes.
6. **Manifest integrity:** `jq` over `manifest.json` validates against `manifest.schema.json` (use `ajv-cli` or equivalent). 36 entries present.
7. **gh auth:** `gh auth status` shows authenticated; `gh pr list --state=open --author=@me` works (already confirmed in planning).
8. **Figma MCP:** one `mcp__Figma__get_metadata` call against the known design-system file completes without error; result snippet lands in `ORCHESTRATOR.md` as a reachability proof.
9. **PF-1992 PR ships:** full picasso CI + Happo + standard review + outside-team reviewer. Note canary PR has already merged separately by this point.

## Open decisions (call out in PR description, not blockers)

1. **React 19 gate: stub now, real later.** PF-1992 ships the gate stage as a no-op so the orchestrator can run end-to-end without a half-finished React 19 harness. PF-1994 wires the real smoke when it migrates the first Tier 1 component. Recommended over wiring it now and risking a 1–2 day yak-shave on TS 4.7 + React 19 type compatibility.
2. **Per-component plans for Tier 4 (siblings).** Acceptance criteria require Tier 1 plans (7) committed in PF-1992. Manifest seeds all 36 entries but Tier 2/3/4 plan files are deferred to their respective tickets. This matches AI-leverage-tickets §Required infrastructure.
3. **Orchestrator agent vendor.** Spec is agent-agnostic via `--agent=` flag, defaulting to `claude`. Codex / Cursor support is implementable but not exercised in this ticket. Pilot week 1 of PF-1994 picks the production default.
4. **Manifest locking.** Simple file-mutex at `docs/migration/.manifest.lock` is sufficient for one-orchestrator-at-a-time. Multi-agent fleet locking is YAGNI now.

## Out of scope (don't build)

- `bin/generate-code-connect.ts` (PF-2005)
- `bin/base-audit.ts` (PF-2006)
- 5-page measurement protocol (PF-2000)
- Per-component plans for Tier 2 / 3 / 4
- Real React 19 smoke harness (PF-1994)
- TS 5.4+ upgrade (separate prerequisite, migration plan §9.1)
- Codemod work (PF-2024 onward)
- Provider rewrite (PF-2023)
