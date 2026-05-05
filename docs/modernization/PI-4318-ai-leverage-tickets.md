# PI-4318 — AI Leverage Ticket Specs

**Parent:** [PI-4318 — Picasso Modernization + AI Developer Experience](https://toptal-core.atlassian.net/browse/PI-4318)
**Cross-references:** [PI-4318-ai-leverage-evaluation.md](./PI-4318-ai-leverage-evaluation.md), [PI-4318-tickets-by-track.md](./PI-4318-tickets-by-track.md), [PI-4318-P1-MOD-01-migration-plan.md](./PI-4318-P1-MOD-01-migration-plan.md)
**Status:** Proposed Jira ticket descriptions for the autonomous agent infrastructure that powers AI leverage on PF-1994 (component migrations), PF-2005 (Code Connect), and PF-2006 + PF-2027 (BASE spec gaps).

These ticket specs are paste-ready for Jira; they describe the autonomous-agent flavor of each ticket, the supporting infrastructure, and what stays human.

---

## Table of contents

- [PF-1994 / 2024 / 2025 — Autonomous component migration with agent orchestration](#pf-1994--2024--2025--autonomous-component-migration-with-agent-orchestration)
- [PF-2005 — Agentic Code Connect generator (top 20)](#pf-2005--agentic-code-connect-generator-top-20)
- [PF-2006 + PF-2027 — AI-driven BASE audit + designer-led fixes](#pf-2006--pf-2027--ai-driven-base-audit--designer-led-fixes)

---

## PF-1994 / 2024 / 2025 — Autonomous component migration with agent orchestration

### What we're trying to enable

A single Claude Code agent (or a fleet of them) that can:

1. Pick up a component from a queue
2. Apply the migration playbook
3. Run gate scripts locally (Jest, Cypress, Happo, React 19 smoke)
4. Iterate on its own output until gates pass
5. Open a GitHub PR via `gh` CLI
6. Watch CI; if CI fails, fetch logs, fix, push
7. Wait for human reviewer comments; classify them; fix or respond
8. Wait for approval; mark the component done in the manifest
9. Move to the next component

The engineer's role becomes: **review PRs**, handle the ~30% of components where the agent gets stuck, sign off Tier 3 architecture decisions. No more manual orchestration.

### Architecture

Two complementary layers:

#### Layer 1 — `yarn migrate:component <Name>` (the validator wrapper)

Already in the migration plan §6.1 as proposed. This is the *inner loop*. It does NOT call the AI. It's the gate-runner that the AI invokes after attempting a migration.

```
yarn migrate:component <Name>
```

Internally runs (per migration plan §4.3 + §6.1):

```bash
bin/migration-gate.sh <Name>   # build + typecheck + lint + jest + cypress + happo + react19
bin/migration-diff.sh <Name>   # prop surface diff, import diff, Happo diff summary, React 19 warnings
```

Output: a structured report (`migration-runs/<date>/<Name>/report.md`) with PASS/FAIL per gate + diff summary.

**The agent calls this script; it does not replace it.** The script is the source of truth for "is this migration done".

#### Layer 2 — Per-component plans + agent orchestration (the outer loop)

```
docs/migration/
├── PROMPT.md                          # canonical migration prompt (already in plan §5.2)
├── ORCHESTRATOR.md                    # how the agentic loop works (NEW)
├── manifest.json                      # tracks migration status (NEW)
├── reference/                         # canonical examples (already in plan §5.1)
│   ├── Button.tsx
│   ├── Switch.tsx
│   ├── Button-styles.ts
│   └── Button-package.json
├── rules/                             # rule docs (already in plan §5.3)
│   ├── styling.md
│   ├── api-preservation.md
│   └── jss-to-tailwind-crib.md
├── tokens/
│   └── picasso-tailwind-tokens.md
└── components/                        # per-component migration plans (NEW)
    ├── _README.md
    ├── Note.md
    ├── FormLabel.md
    ├── Form.md
    ├── ...
```

**Per-component plan file structure** (example for Note):

```markdown
# Note — migration plan

## Identity
- Path: `packages/base/Note/`
- Tier: Tier 1 — leaf, small surface (~120 LOC)
- Track: Modernization (PF-1994)

## Dependencies
Migration must be applied AFTER:
- Typography (referenced via `<Typography>` in render)

## Migration scope
- Replace `@material-ui/core` imports with `@base-ui/react` equivalents
- Convert `useStyles` JSS to Tailwind class arrays (pattern from Button.tsx reference)
- Preserve public prop surface: `type`, `variant`, `iconStart`, `children`

## Known gotchas
- `useStyles` hook uses `theme.palette.note` — token equivalent is `bg-yellow-50` / `border-yellow-300` etc. (verify in tokens/picasso-tailwind-tokens.md)
- The `iconStart` slot needs to keep its `className` prop forwarded
- `data-testid` selectors used in 4 active repos — preserve exactly

## Acceptance criteria (specific to this component)
- [ ] All 4 stories in Storybook render identically (Happo)
- [ ] Public prop surface diff is empty (no breaking changes)
- [ ] Jest tests pass without test changes (snapshots OK to regen)
- [ ] No `@material-ui/core` imports in `packages/base/Note/src/**`
- [ ] `packages/base/Note/package.json` peer-dep removed

## Reviewer notes
- Vedran has expressed preference for keeping the prop name `iconStart` (don't rename to `startIcon` even though MUI v5 convention does)
- Watch for the `__deprecated_*` props — they're for backward-compat with old `<Note>` consumers, must stay
```

**Manifest** (`docs/migration/manifest.json`):

```json
{
  "components": {
    "Note": {
      "tier": 1,
      "status": "done",
      "pr": "https://github.com/toptal/picasso/pull/4912",
      "merged_at": "2026-06-02T14:30:00Z",
      "iterations": 2
    },
    "FormLabel": {
      "tier": 1,
      "status": "in_progress",
      "branch": "migrate-formlabel",
      "pr": null,
      "iterations": 1
    },
    "Form": {
      "tier": 1,
      "status": "queued",
      "depends_on": ["FormLabel"]
    }
  }
}
```

The agent reads this to find the next component, respect dependency order, and not duplicate work.

### Agent loop (one component end-to-end)

```
1. Read manifest.json → find next component with status="queued" and all deps done
2. Read docs/migration/components/<Name>.md
3. Verify dependencies are merged (check manifest + git)
4. Create branch: `git checkout -b migrate-<name>`
5. Update manifest: status="in_progress", branch=<branch>
6. Apply migration prompt with:
   - PROMPT.md (canonical instructions)
   - reference/Button.tsx + Switch.tsx (canonical examples)
   - rules/* (3 rule docs)
   - tokens/picasso-tailwind-tokens.md
   - components/<Name>.md (per-component plan)
   - The component's current source (packages/base/<Name>/src/**)
7. Agent edits files
8. Run `yarn migrate:component <Name>`
9. If gates fail:
   a. Read migration-runs/<date>/<Name>/report.md
   b. Iterate: feed report back as next prompt → AI fixes → run gates again
   c. Hard cap: 3 iterations per migration plan §4.6
   d. If still failing, mark manifest status="needs_human", post Slack/email, stop
10. If gates pass:
    a. Commit changes (semantic message: "migrate(<Name>): MUI v4 → Tailwind + Base UI")
    b. Push branch
    c. Run `gh pr create` with diff report as PR body
    d. Update manifest: pr=<URL>
11. Poll CI (every 5 min, max 60 min):
    a. If CI passes, move to step 12
    b. If CI fails, run `gh pr view --json statusCheckRollup`, fetch failing logs
    c. Feed CI output to AI → fix → push → loop back to 11a
12. Wait for human review (poll every 30 min, max 48 hours):
    a. Run `gh pr view --json reviews`
    b. If reviewer left CHANGES_REQUESTED, run `gh pr view --json comments`
    c. Classify each comment:
       - Code suggestion → apply via `gh pr review --apply` if simple
       - Question → AI drafts a reply, posts via `gh pr comment`
       - Architectural concern → flag in manifest, escalate to human, stop
    d. After fixes, push, loop back to 11
13. On APPROVED:
    a. Run squash merge via `gh pr merge --squash --auto`
    b. Update manifest: status="done", merged_at=<timestamp>
    c. Move to step 1 with next component
14. On unrecoverable failure (3 iterations, CI flake, or hostile review):
    a. Update manifest: status="needs_human"
    b. Post escalation
    c. Stop the loop until human intervention
```

### Required infrastructure to build (sub-deliverables)

These are the implementation tasks for PF-1994. Some can fit inside PF-1992 (migration plan ticket); some need their own dedicated time.

| Sub-deliverable | Owner | Effort | When |
|---|---|---|---|
| `bin/migration-gate.sh` + `bin/migration-diff.sh` | Eng A | 1d | PF-1992 |
| `docs/migration/` prompt pack (PROMPT.md, rules/, reference/, tokens/) | Eng A | 1d | PF-1992 |
| Per-component plan files (17 base/* + 11 QB + 8 RTE = 36 plans) | Eng A | 1d (AI-generated, manual review) | PF-1992 |
| `docs/migration/manifest.json` schema + initial state | Eng A | 0.25d | PF-1992 |
| `docs/migration/ORCHESTRATOR.md` (the loop spec, runbook) | Eng A | 0.5d | PF-1992 |
| `bin/migration-orchestrator.ts` (the agent runner) | Eng A | 1d | PF-1994 (Tier 1 cleanup-only batch first; Note as sandbox) |
| GitHub `gh` CLI integration patterns + auth setup | Eng A | 0.25d | PF-1994 |

**Net: ~5 days of upfront infrastructure** (mostly absorbed in PF-1992 which is currently 2-3d). The marginal cost is ~2d.

### How the engineer interacts

**During PF-1994 Tier 1 cleanup + Tier 0 light path (11 cleanup + 8 light components, per migration plan v3):**
- Engineer kicks off the agent: `bin/migration-orchestrator.ts --tier=1` (cleanup batch first, Note as sandbox), then `--tier=0` for the 8 light-path components.
- Tier 1 sequence: Note (sandbox) → Form, FormLayout, ModalContext, Typography (clean) → Container, Grid, Notification, FormLabel (type-only fixes) → Menu (pkg cleanup) → Utils (replace 2 small re-exports + 1 Tailwind transition).
- Tier 0 sequence: Backdrop first (Modal + Drawer depend on it) → Badge → Button → Slider → Switch → Tabs → Modal → Drawer.
- Engineer monitors PRs as they open
- Engineer reviews each PR within ~24h SLA
- Engineer approves, agent merges automatically
- Engineer fixes the ~1-2 components where the agent escalates
- After batch wraps, recalibrate light-path multipliers (PR #4906 baseline may not generalise to Drawer/Modal/Slider — see migration plan R12)

**During PF-2024 Tier 2 (5 truly-heavy components — Checkbox, Radio, Tooltip, FileInput, Popper):**
- Same pattern but with `PROMPT-heavy.md`. Agent improvements (better prompt, more examples) compound from Tier 0 lessons.
- Order: **Tooltip first** (FileInput depends on it). Checkbox + Radio in parallel (FormLabel already shipped in PF-1994). FileInput last.
- Risk concentrates on Tooltip (`@base-ui/react/tooltip` viability), Popper (primitive choice — `@floating-ui/react` vs `@base-ui/react/popover`, locked in PF-1992 spike per R15).
- v14 reclassification: FormLabel + Utils + Container + Grid + Notification moved to Tier 1 (type-only fixes); Page moved to Tier 3.

**During PF-2025 Tier 3 (3 composite components — Accordion, Dropdown, Page — plus OutlinedInput mixed-state):**
- More engineer involvement expected
- Agent may stop at architecture decisions (e.g., `PicassoProvider.override` chains, JSS `&$expanded` parent-ref unwinding)
- Engineer drives the architecture step manually, agent does the per-file rewrite after
- Mixed-state Dropdown + OutlinedInput: single PR per component covers both light + heavy passes
- Page is custom Tailwind rewrite (no `@base-ui/react` analog); migrate last in `base/*` since it depends on most of Tier 0 + Tier 2

### Trust + safety mechanisms

1. **Hard iteration cap (3 per component).** Per migration plan §4.6. Prevents agent from hammering on a hard problem indefinitely.
2. **No auto-merge without human approval.** Agent uses `gh pr merge --auto` which only merges on APPROVED + CI green. Cancellable at any time.
3. **Manifest as audit trail.** Every action is logged. Easy to roll back a bad agent run.
4. **Branch protection.** Main branch requires ≥1 human approval. Even if agent goes rogue, it can't push to main.
5. **Kill switch.** Stop the orchestrator process; in-flight PRs stay open for human takeover.
6. **Sandbox mode.** First run on Note (smallest Tier 1 component) is sandboxed — agent stops after PR creation, doesn't auto-iterate on CI/review until validated.
7. **Per-tier review depth budget.** Tier 1 PRs need 1 reviewer; Tier 3 PRs need 2 (one with Mod-track context).

### Acceptance criteria (paste into Jira)

- [ ] `bin/migration-orchestrator.ts` implemented with the loop above
- [ ] `docs/migration/manifest.json` populated with all 28 component-migration units (11 Tier 1 cleanup + 8 Tier 0 light + 5 Tier 2 heavy + 3 Tier 3 composite + 1 OutlinedInput mixed-state + 4 sibling packages + provider; with 11 QB + 8 RTE inside the sibling packages)
- [ ] Per-component plan files committed for all Tier 1 cleanup (11) + Tier 0 light path (8) — required to start PF-1994
- [ ] Two prompt files committed: `PROMPT-light.md` (Tier 0) + `PROMPT-heavy.md` (Tier 2-5)
- [ ] `base-ui-react-api-crib.md` rule doc lists per-Picasso-component target paths (per migration plan §3 mapping)
- [ ] First component (Note, Tier 1 cleanup) successfully migrated end-to-end: agent created PR, CI passed, human approved, agent merged
- [ ] All 11 Tier 1 cleanup units complete + all 8 Tier 0 light-path components migrated via the agent (with up to 2 needing human takeover)
- [ ] Iteration cap respected (no PR with > 3 agent-driven force-pushes after CI green)
- [ ] Manifest accurately reflects state at all times
- [ ] Per-component DoD met (Happo pixel-perfect, Jest+Cypress green, React 19 smoke, no MUI v4 imports, no `@mui/base` imports)
- [ ] Backdrop + Popper architectural decisions locked (R14, R15)

### Risks specific to this approach

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Agent produces code that passes gates but fails human review | Medium | Medium | Per-tier review depth budget; first-component validation; engineer reviews tier-1 PRs carefully |
| CI polling hits GitHub rate limits | Low | Low | Poll every 5 min max; back off on 429 errors |
| Agent gets stuck in 3-iteration loop, escalates everything | Medium | Medium (low if engineers are responsive) | If Tier 1 escalation rate >50%, pause and improve prompt before continuing |
| Two agent runs collide on same component | Low | High | Manifest locking via file-level mutex; orchestrator checks status before claiming work |
| Reviewer leaves architectural feedback agent can't act on | High (Tier 3) | Low (escalation works) | Mark manifest needs_human; engineer takes over |
| Agent merges incorrect code via `--auto` because human approved hastily | Low | High | Require 2 approvals on Tier 3 PRs; spot-check the agent's responses to review comments |

### What this DOES NOT change

- Migration plan §3 tier inventory (Tier 1/2/3) — still valid
- Per-component DoD (§2) — agent meets it; doesn't bypass
- Architecture decisions on Tier 3 — still human-led; agent assists
- Provider rewrite (PF-2023) — out of scope for this ticket; system rewrite needs different approach

### Net schedule impact

Per [PI-4318-ai-leverage-evaluation.md](./PI-4318-ai-leverage-evaluation.md):
- Tier 1 (PF-1994): 4d → 2-3d (autonomous loop saves ~1-2d)
- Tier 2 (PF-2024): 5d → 3-4d (saves ~1-2d)
- Tier 3 (PF-2025): 6d → 4-6d (less compression — architecture floor)
- Sibling packages (PF-2020/2021/2022): ~7d → ~4-5d combined savings
- **Combined: ~3-4 days saved on Modernization core, plus ~1-2d saved on siblings.**

Plus higher quality: every PR has a structured diff report attached, every iteration is logged.

---

## PF-2005 — Agentic Code Connect generator (top 20)

### What we're trying to enable

A Claude Code agent that can:

1. Read a Picasso component's source (filesystem)
2. Read its BASE counterpart's schema (Figma MCP)
3. Generate a `.figma.tsx` file mapping BASE props → Picasso props
4. Run Dev Mode CodeConnectSnippets verification (Figma MCP)
5. Iterate on mismatch until snippet matches expected output
6. Commit + open PR

The engineer's role: review the 30% of components where the agent gets stuck (complex variants, ambiguous prop semantics).

### Architecture

#### `yarn generate:code-connect <Name>` (the wrapper)

```
yarn generate:code-connect Button --base-url=https://figma.com/file/.../?node-id=42
```

Internally:
1. Reads `packages/base/<Name>/src/<Name>/<Name>.tsx` — extracts prop interface, default props, JSDoc descriptions
2. Calls Figma MCP to fetch BASE component schema for the given node ID — extracts variant options, slot definitions
3. Generates `<Name>.figma.tsx` with `figma.connect()` call mapping props
4. Runs `figma connect publish --dry-run`
5. Runs Dev Mode snippet check via Figma MCP
6. If snippet matches expected output (within fuzz tolerance), commits
7. If not, reads the diff between expected and actual snippet → adjusts mapping → retries (max 3)

#### Per-component config

A small config file maps component names to BASE Figma node IDs:

```yaml
# docs/code-connect/component-map.yaml
Button:
  base_node: "https://figma.com/file/abc/?node-id=42"
  picasso_path: "packages/base/Button/src/Button/Button.tsx"
Switch:
  base_node: "https://figma.com/file/abc/?node-id=43"
  picasso_path: "packages/base/Switch/src/Switch/Switch.tsx"
# ... 18 more for top 20
```

Designer + engineer fill this in once during Phase 1 prep (~0.5d).

### Per-component agent loop

```
1. Read component-map.yaml → find next component
2. Fetch BASE schema via Figma MCP (props, variants, slots)
3. Read Picasso source (TypeScript AST or AI extraction)
4. Auto-map:
   - For each BASE prop, find matching Picasso prop (exact name match first, then fuzzy)
   - For each variant option in BASE, map to Picasso prop value
   - For unmapped, flag with TODO comment for engineer
5. Generate `.figma.tsx` from template
6. Run snippet verification:
   - Render Picasso component with mapped props
   - Compare to BASE Figma snippet expectation
   - If mismatch within tolerance (≤5% prop diff), pass
7. If failures:
   - Read diff (which prop didn't map)
   - Adjust mapping (try fuzzy match, infer from JSDoc)
   - Retry (max 3 iterations)
8. If passing: commit + (optionally) open PR
9. If still failing: mark in manifest, leave TODO comments, escalate to engineer
```

### Required infrastructure

| Sub-deliverable | Effort | When |
|---|---|---|
| Figma MCP setup for the Picasso repo | 0.25d | PF-1992 |
| `bin/generate-code-connect.ts` (the wrapper) | 1d | PF-2005 |
| `docs/code-connect/component-map.yaml` (top 20 entries) | 0.25d | PF-2005 (designer assists) |
| `.figma.tsx` template + AI prompt for generation | 0.5d | PF-2005 |
| Dev Mode snippet verification script | 0.5d | PF-2005 |

Total upfront: **~2.5d**, mostly absorbed in PF-2005 itself.

### Acceptance criteria (paste into Jira)

- [ ] `bin/generate-code-connect.ts` implemented with the loop above
- [ ] `docs/code-connect/component-map.yaml` filled in for top 20 components
- [ ] Figma MCP successfully reads BASE schemas for all 20 components
- [ ] First 5 components manually verified (engineer reviews `.figma.tsx`, designer verifies in Dev Mode)
- [ ] Remaining 15 components generated by agent; engineer reviews + approves
- [ ] All 20 `.figma.tsx` files published via Figma Code Connect CLI
- [ ] M10 (Code Connect coverage) reports 20/20
- [ ] Figma MCP configured for 3-5 pilot engineers
- [ ] M12 drift CI check live: PRs that change Picasso component prop names break the corresponding `.figma.tsx`

### Risks specific to this approach

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Figma MCP returns ambiguous prop semantics (e.g., `Disabled` could mean `disabled` or `readOnly`) | Medium | Medium | Component map includes `prop_hints` for ambiguous cases; engineer reviews first 5 components manually |
| BASE component schema doesn't expose all variants programmatically | Medium | Medium | Fall back to manual variant mapping for those components; agent flags as escalation |
| Dev Mode snippet verification has flake | Low | Low | Retry on transient failures; cache successful runs |
| Generated `.figma.tsx` is technically valid but stylistically inconsistent | High (initially) | Low | First 5 components define the canonical style; agent learns from those |

### Net schedule impact

Per evaluation doc:
- PF-2005: 5-7d → **3-5d** (saves 2 days)
- Plus the agent infrastructure transfers directly to PF-2009 (55 components) where it compresses 7-10d → 3-5d (saves 4-5d)

**Combined PF-2005 + PF-2009 savings: ~5-7 days**

---

## PF-2006 + PF-2027 — AI-driven BASE audit + designer-led fixes

### What we're trying to enable

A Claude Code script that:

1. Reads Picasso component documentation (PF-2001 output: prop interfaces, types, variants, dos/don'ts)
2. Reads BASE component schemas via Figma MCP
3. Compares programmatically: prop names, types, variant coverage, missing/extra
4. Outputs a RAG-status spreadsheet (CSV or markdown)
5. For each red/yellow item, generates a specific fix recommendation

The designer's role: **review only the flagged items**, make the actual Figma updates. They don't audit from scratch — they review AI's audit output.

### Architecture

#### `yarn base-audit <component-list>` (the wrapper)

```
yarn base-audit --top-20    # for PF-2006
yarn base-audit --remaining-55  # for PF-2027
```

Internally:
1. Reads list of components (from `docs/code-connect/component-map.yaml` or PF-2001a docs)
2. For each component:
   a. Fetch BASE schema via Figma MCP
   b. Parse Picasso doc (`docs/components/<Name>.md` from PF-2001) for prop interface
   c. Parse Picasso source (TypeScript AST for ground truth)
   d. Compare:
      - Prop names: case match? (Picasso `disabled` vs Figma `Disabled` — case insensitive flag)
      - Prop types: enum members match? (Picasso `size: 'small' | 'medium' | 'large'` vs Figma `Size: Small | Medium | Large`)
      - Required props: all present in BASE?
      - Variant coverage: every Picasso variant has a Figma counterpart?
      - Default values: match?
   e. Classify component as green / yellow / red:
      - **Green:** all props match exactly
      - **Yellow:** minor naming inconsistencies (case, plural/singular) — fixable in Figma
      - **Red:** missing variants, type mismatches, semantic differences — needs designer attention
   f. For yellow/red items, generate specific fix:
      - "Rename Figma prop `IsDisabled` → `Disabled` to match Picasso's `disabled`"
      - "Add Figma variant `Size: Tiny` (Picasso has `size: 'tiny'`)"
      - "Remove Figma prop `LegacyMode` (Picasso doesn't have this prop)"
3. Outputs spreadsheet (`docs/base-audit/<date>-audit.csv` or markdown):

```
Component | Status | Mismatches | Recommendations | Designer-time estimate
Button    | green  | 0          | -               | 0 (skip)
Switch    | yellow | 2          | Rename `IsOn` → `Checked`; align variant case | 0.25d
Tooltip   | red    | 5          | Add `placement` variant options; rename `Disabled`; ... | 1d
```

#### Designer workflow

1. Receive spreadsheet (auto-emailed when audit completes, or as a Slack post via webhook)
2. Sort by status: red first, yellow second, skip green entirely
3. Open BASE Figma file
4. For each red component, apply the AI's fix recommendations one at a time
5. For each yellow component, batch the cosmetic naming fixes
6. Spot-check 10% of green-flagged components to validate AI didn't miss something
7. Commit Figma changes; update component change-log

**Designer time savings:** ~70% reduction in audit time (auditing was the bulk of the original effort). Actual Figma update time is unchanged.

### Required infrastructure

| Sub-deliverable | Effort | When |
|---|---|---|
| `bin/base-audit.ts` (the script) | 1d | PF-2006 (first use; reusable for PF-2027) |
| Figma MCP integration (overlap with PF-2005) | shared | already in PF-2005 |
| Picasso prop-extraction logic (TypeScript AST traverser) | 0.5d | PF-2006 |
| RAG-status classifier rules | 0.25d | PF-2006 (heuristic; refines after first 20) |
| Fix-recommendation prompt templates | 0.25d | PF-2006 |
| Spreadsheet output format (CSV + markdown) | 0.25d | PF-2006 |

Total upfront: **~2.25d**, primarily front-loaded in PF-2006 (first run on top 20). PF-2027 reuses the script, gets the audit for free, designer just reviews more items.

### Acceptance criteria (paste into Jira — PF-2006)

- [ ] `bin/base-audit.ts` implemented with the comparison logic above
- [ ] Figma MCP integration verified end-to-end (read BASE schemas for top 20 components)
- [ ] Picasso prop extraction works on all top 20 components (TypeScript AST + JSDoc)
- [ ] RAG-status classifier validated: at least one example each of green / yellow / red identified correctly on top 20
- [ ] Spreadsheet generated for top 20 with prop mismatches, variant gaps, and per-component fix recommendations
- [ ] Designer reviews + applies fixes (only the yellow/red items): all flagged items addressed in Figma, change-log committed to DS space
- [ ] Spot-check pass: 2 green-flagged components manually verified by designer
- [ ] Audit script reusable as-is for PF-2027 (no Picasso-specific tweaks needed)

### Acceptance criteria (paste into Jira — PF-2027)

- [ ] Run `yarn base-audit --remaining-55` against all remaining 55 components
- [ ] Designer reviews flagged items: all yellow/red items addressed in Figma
- [ ] Spot-check pass: 5 green-flagged components manually verified
- [ ] M10 / M12 still green after BASE updates (Code Connect snippets still match)
- [ ] Change-log committed to DS space with per-component summary

### Risks specific to this approach

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| AI miscategorizes (false-greens hide real issues) | Medium | Medium | Spot-check 10% of green-flagged components; refine classifier after first run |
| Designer rejects "review only flagged items" model | Low | Low (just adds a manual audit pass) | Validate AI's classification on first 10 components together with designer; build trust |
| Figma MCP can't read all BASE component schemas | Medium | Medium | Manual fallback for unsupported components; fail gracefully with clear "audit not possible" status |
| Picasso source has prop types AI can't parse (complex generics, unions) | Low | Low | Fall back to JSDoc; flag component for manual audit |
| Designer applies fixes but breaks existing Figma usage | Medium | High | Coordinate with consumers via DS change-log; version-control Figma changes |

### What this DOES NOT change

- Designer still does all actual Figma updates. AI doesn't touch Figma.
- BASE component change-log still committed by designer to DS space.
- Code Connect snippet validation (PF-2005, PF-2009) is downstream — depends on these audits being applied first.

### Net schedule impact

Per evaluation doc:
- PF-2006: 5-8d → **3-5d** (saves 2-3 days, mostly designer time)
- PF-2027: 10-12d → **6-9d** (saves 3-4 days, mostly designer time)
- **Combined savings: ~5-7 days, mostly designer wall-clock**

The audit script is the single highest-leverage AI deliverable in the program because it transforms the designer's role from "audit + fix" to "review-flagged + fix", and audit was the bulk of the work.

---

## Cross-cutting infrastructure

These are shared across all three ticket areas. Worth scoping as a single setup task in PF-1992 (~2-3d):

| Infra | Used by | Effort |
|---|---|---|
| Figma MCP setup + auth | PF-2005, PF-2006, PF-2027, PF-2009 | 0.25d |
| `gh` CLI auth + token management | PF-1994 (orchestrator) | 0.25d |
| Picasso TypeScript AST parser (for prop extraction) | PF-2005, PF-2006, PF-2027 | 0.5d |
| Per-component manifest pattern | PF-1994 (component manifest), PF-2005 (component-map.yaml) | 0.25d (write once) |
| Slack/email escalation hooks for agent failures | PF-1994 orchestrator | 0.25d |

If we're committing to AI leverage, **bake these into PF-1992 explicitly** as Phase 1 setup deliverables. They unlock the rest.

---

## What I'd actually do if I were Vedran

1. **Validate the approach on Note (smallest Tier 1 component).** Build the orchestrator, run end-to-end on Note. Time-box to 1.5 days. If it works, scale to Tier 1.
2. **Build the BASE audit script in parallel during Phase 1.** This is the highest-leverage tactic and the script is reusable; pays back immediately on PF-2006.
3. **Hold the agentic Code Connect generator until PF-2005 starts.** It's not blocking earlier work and the BASE audit findings will inform what props need mapping anyway.
4. **Add a "kill switch" practice early.** First Tier 1 component goes through the agent in sandboxed mode (no auto-merge). Validate quality. Then enable full automation for the rest.
5. **Track agent escalation rate per tier.** If Tier 1 escalates >40%, pause and improve the prompt. If Tier 2 escalates >60%, fall back to manual + AI assist for Tier 3 (don't try to be heroic).

The biggest single risk is over-confidence: the agent works on Note, you assume it'll work on Page (Tier 3), and Page surfaces architectural decisions the agent can't make. Defending against this means treating each tier as a separate validation milestone.
