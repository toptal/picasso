# PROMPT-light.md — `@mui/base` → `@base-ui/react` (Tier 0)

**Path:** Light. **Used for:** Tier 0 components (Backdrop, Badge, Button, Drawer, Modal, Slider, Switch, Tabs) and the `@mui/base` portion of mixed-state components (Dropdown, OutlinedInput).

**Source:** Verbatim from [`docs/modernization/PI-4318-P1-MOD-01-migration-plan.md`](../modernization/PI-4318-P1-MOD-01-migration-plan.md) §5.2.

**Versioned.** Iterate; bump version on the `## v<N>` heading. Loaded into the agent at every Tier 0 component migration; the orchestrator selects this prompt via `workflow.promptFor(item)` based on the manifest's `tier` field.

---

## v2

You are migrating a Picasso component from `@mui/base` to `@base-ui/react`. Tailwind is already in place; the component already uses `cx`/`twMerge` for class composition. Your task is the package swap + API alignment, not a full rewrite.

## STOP rules (hard vetos — internalize before editing)

1. Do not commit if `pnpm -F @toptal/picasso-<NAME> build:package` fails — stale build poisons snapshots (see `references/practices.md` §"Build & snapshot precondition").
2. Do not pass `--config.link-workspace-packages=false` or any other workspace-link override to `pnpm install` — see `rules/package-and-build.md`.
3. Do not self-classify a Happo diff as INTENTIONAL without explicit operator approval — only allowed when `docs/migration/components/<X>.md` §"Approved visual deltas" lists the specific delta. See `references/happo-iteration.md`.
4. Do not drop `classes` prop on Dropdown or OutlinedInput — both retain locally narrowed `classes?: { ... }` per `decisions/classes-audit.md` §Tier 3.b. See `references/design-patterns-addendum.md` §"Migration-period architectural exceptions".
5. Do not fall back to `any` or `as unknown as T` blanket casts to silence types — violates `references/code-standards.md` and `rules/api-preservation.md`.
6. Do not preemptively rebuild prop interfaces around `BaseProps` (rule 10 of `PICASSO_COMPONENT_DESIGN_PATTERNS.md`) — that's a separate refactor track. Migration PRs preserve `extends StandardProps` (with `Omit<StandardProps, 'classes'>` per the classes decision matrix).
7. Do not introduce sweeping prop renames; library-swap stays scoped. Document any deliberate rename in the changeset with a deprecation alias.

## Inputs you have read access to

- `PICASSO_COMPONENT_DESIGN_PATTERNS.md` (repo root) — the 16 + 3 canonical Picasso component rules. Reviewers cite this.
- `references/design-patterns-addendum.md` — migration-only delta: existing-violations carve-out + rule 5 / rule 10 architectural exceptions.
- `references/code-standards.md` — Picasso file structure, naming, JSDoc, ESLint custom rules, test conventions, Tailwind composition.
- `references/practices.md` — graduated migration patterns (build precondition, classification, API preservation, changeset format, idioms).
- `rules/api-preservation.md` — prop surface rules.
- `rules/base-ui-react-api-crib.md` — `@base-ui/react` component patterns + polymorphic + type-narrowing.
- `rules/package-and-build.md` — pnpm/lockfile policy + build-before-snapshot precondition.
- `references/visual-verification.md` — Playwright MCP workflow + worked compensation examples.
- `references/happo-iteration.md` — Happo classification matrix + worked diff example.
- `decisions/classes-audit.md` — starting hypothesis for step 5 (the `classes` decision matrix).
- `reference/Button.tsx` — canonical `@base-ui/react` migration (light path).
- `reference/Switch.tsx` — minimal `@base-ui/react` migration.

You are migrating: `packages/base/<NAME>`

## Execution steps

### 1. Imports

Replace `@mui/base` imports with `@base-ui/react` equivalents:

- `@mui/base/<X>` → `@base-ui/react/<X>` (when API matches)
- `@mui/base/use<X>` → `@base-ui/react/use<X>` (when hook exists)

For API differences, consult `rules/base-ui-react-api-crib.md` BEFORE adapting. The crib documents the polymorphic patterns, slot migration, type narrowing.

### 2. Tailwind class composition stays as-is

That was the win of the `@mui/base` era. Don't rewrite styles. If the migration revealed a JSS pattern that escaped earlier sweeps, see `rules/jss-to-tailwind-crib.md` (heavy-path territory).

### 3. API preservation

Preserve the public prop surface. When `@base-ui/react`'s types narrow vs Picasso's wider public types (e.g., polymorphic components where Picasso accepts `MouseEvent<HTMLButtonElement & HTMLAnchorElement>` but `@base-ui/react` accepts `MouseEvent<HTMLButtonElement>`), do NOT change the public type. Cast at the **type boundary** — hoisted into a helper's return type or a local typed binding — NOT sprinkled inline in JSX:

```ts
// Preferred — hoist the cast into the helper's return type:
const getClickHandler = (
  loading?: boolean,
  handler?: Props['onClick']
): BaseUIButton.Props['onClick'] =>
  (loading ? noop : handler) as BaseUIButton.Props['onClick']

// Then in JSX, no cast needed:
<BaseUIButton onClick={getClickHandler(loading, onClick)} />
```

`forwardRef<HTMLButtonElement, Props>(...)` already types `ref` correctly — don't cast it at the JSX site. Spreading `{...rest}` with a cast (`{...(rest as BaseUIButton.Props)}`) is `// @ts-ignore` in disguise; drop the offending Picasso-only prop before spreading.

See `rules/base-ui-react-api-crib.md` §"Polymorphic Button" for the `nativeButton + render` pattern and §"Type alignment at the boundary" for the hoisted-cast pattern. **Do not add a runtime `typeof`/`isValidAs` guard for the `as` prop** — TypeScript already constrains it; reviewers will ask you to remove it.

If a prop genuinely must change (a public type that cannot be preserved even with casting), add it to `docs/migration/<Component>-diff.json` with `codemod=required`.

### 4. `package.json` & lockfile

Apply `rules/package-and-build.md` IN FULL. Highlights:

- Caret prefix for npm deps (`"^1.4.1"`); exact for workspace deps (no caret).
- Drop the `react: < 19.0.0` upper bound from `peerDependencies`.
- Run plain `pnpm install` from repo root; stage `pnpm-lock.yaml` in the same commit. NO workspace-link override flags.
- STOP if the lockfile diff is > 1000 lines OR you see `link:packages/X` lines being REPLACED with expanded peer-suffix form.

### 5. The `classes` prop — RESEARCH FIRST, THEN DECIDE

The cross-tier audit (`decisions/classes-audit.md`, 2026-05-11) catalogued each component's `classes` API surface. The audit is your **starting hypothesis**, not a script — sources drift, edge cases exist. Verify per-component before editing.

**Research steps (MUST complete all 5 before consulting the decision matrix):**

1. Read the source: confirm what `extends` the Props uses, whether the body reads `classes` (and how), and whether there's a runtime backstop (`classes: _classes`).
2. `rg` internal callsites in the repo: `rg "<Component>.*classes" packages/`.
3. Cross-reference with `decisions/classes-audit.md` §3 / §4 / §5 for this tier.
4. If the audit says "vestigial" but the source still reads `classes` in render — STOP, update the audit, don't proceed unilaterally.
5. If you're migrating Dropdown or OutlinedInput, confirm the locally narrowed shape per §Tier 3.b — DO NOT drop the prop.

**GATE: Do not proceed to the decision matrix until all 5 research steps are complete. If you skip any, your decision will be wrong.**

**Decision matrix (Tier 0):**

| Your finding | Action |
|---|---|
| Component extends `StandardProps` and body never reads `classes` | `extends Omit<StandardProps, 'classes'>` + destructure `classes: _classes` runtime backstop. (Button, Backdrop, Badge, Drawer, Slider, Switch, Tabs.) |
| Component is Modal — external consumers use `<Modal classes={{ closeButton }}>` per audit §6/§9 | Re-verify; may need Tier 3.b treatment (keep narrowed) instead of standard drop. |
| Component is Dropdown or OutlinedInput | KEEP locally narrowed `classes?: { ... }` per Tier 3.b. Do NOT drop. |
| Audit contradicts source state | STOP. Update the audit doc; do not proceed unilaterally. |

The `withClasses` helper from `@toptal/picasso-utils` is **deprecated** — do not introduce new usages.

### 6. File preservation

Preserve every `*.example.tsx`, `*.story.tsx`, `test.tsx`, and `story/index.jsx` file. Migration PRs should NOT delete or rename these unless the public API genuinely changed. If a test fails post-migration, the FIRST move is to verify the migrating package builds cleanly (`pnpm -F @toptal/picasso-<NAME> build:package`), THEN regenerate snapshots — see `rules/package-and-build.md` §"Build-before-snapshot precondition".

### 7. Changeset

Add a `.changeset/<name>.md` major-bump entry. Apply `references/practices.md` §Changesets in full. Required content:

- YAML frontmatter selecting the migrating package and `major` bump.
- A "behavioral parity" framing.
- Enumerate (a) dep removals + peer cap lifts, (b) new implicit behaviors introduced by `@base-ui/react` (e.g., swipe-dismiss, async focus), (c) compound parts being assembled (e.g., "Slider now assembled from `Slider.Root + Control + Track + Indicator + Thumb`").
- For any `@deprecated` props with `_unused` destructure: name them and the planned removal version.

### 8. PR description (mandatory)

The orchestrator opens the PR with `bin/migration-diff.sh report` output as the body, which is mechanical. That's necessary but insufficient — reviewers need YOUR narrative on top. Write it to `migration-runs/<run-date>/<Component>/pr-description.md` BEFORE exit. `<run-date>` is today (YYYY-MM-DD); `<Component>` matches the per-item plan path.

Required sections (each ≤ 4 sentences — reviewers scan, not read):

```markdown
## Summary

<One paragraph. What this PR migrates, at a high level how. Reviewer should grasp the shape in 15 seconds.>

## Decisions

- <Decision 1>: <what you chose> because <why>. <cite rule/decision doc if one applies>
- <Decision 2>: ...
(2-4 bullets focused on choices a reviewer would otherwise ask about.)

## Limitations / Out-of-scope

- <What this PR doesn't address + WHY>. e.g. "Tier-3 dependents (PromptModal, ImagePluginModal) not migrated — that's PF-1998's scope."
- <Known edge case worth mentioning>: e.g. "`disablePortal` kept as a no-op prop with `@deprecated` JSDoc; removal scheduled for next major."

## Verification

- **Local gate stages passed**: build, tsc, lint, jest, cypress, happo (see PR checks for CI re-verify).
- **Runtime check (Playwright)**: <stories/states exercised on `localhost:9001`>.
- **Visual parity**: "Happo verifier returned 0 component diffs against base SHA <base>" OR "1 diff on <Story> — see Happo report for designer accept."
```

Tone: concise, fact-dense. Each section caps at ~4 sentences or ~6 bullets. If a reviewer wants more depth, they ask in a PR comment; you respond there.

Output: file edits only. No explanations.

## Acceptance — iterate to working, then run full

You have Bash access for **verification only** (`pnpm typecheck`, `pnpm --filter:*`, `pnpm davinci-qa:*`, `pnpm lint:*`, `pnpm cypress:*`, `pnpm happo:*`, `pnpm info:*`, `npm view:*`, `git diff/status/log/show/blame`). Use it to self-verify between edits — don't wait for the orchestrator's outer-loop gate.

**Fast inner-loop lint** (scoped to migrating package's src, ~12x faster than repo-wide):

```bash
pnpm davinci-syntax lint code --check packages/base/<NAME>/src
# Auto-fix on the same scope:
pnpm davinci-syntax lint code packages/base/<NAME>/src
```

**Working acceptance** (iterate to pass before declaring done):

- `pnpm -F @toptal/picasso-<NAME> build:package` exits 0.
- `pnpm davinci-syntax lint code --check packages/base/<NAME>/src` exits 0.
- `pnpm -F @toptal/picasso-<NAME> test --runInBand` exits 0 (after snapshot regeneration if needed).
- Playwright runtime check passed per `references/visual-verification.md` §"Mandatory runtime check": zero `[error]` console entries, every story+interaction-state captured, baseline-vs-local diff resolved.

**Full acceptance** (required before declaring done — orchestrator gate runs the same):

- All working-acceptance checks pass.
- Happo verifier returns green for the migrated component per `references/happo-iteration.md` §"Exit criterion", OR all remaining diffs are flagged INTENTIONAL with operator-approved entry in `docs/migration/components/<Component>.md`.
- PR description written to `migration-runs/<run-date>/<Component>/pr-description.md`.
- Changeset added under `.changeset/<name>.md` with all required content per step 7.

**Mandatory runtime check (when `--with-mcp` is active)**: see `references/visual-verification.md` for the full Playwright MCP workflow. Skipping is exiting with an unverified migration — the gate does NOT catch runtime-only errors.

**Visual regression authority**: Happo. See `references/happo-iteration.md` for the classification matrix, confidence stages, computed-style-diff requirement, and worked example.

---

## Changelog

### ## v2 (2026-05-21)

Split-prompt overhaul:

- Slimmed from 375 → ~180 lines. Extracted pnpm/build to `rules/package-and-build.md`, visual verification to `references/visual-verification.md`, Happo iteration to `references/happo-iteration.md`.
- Added STOP rules block (7 hard vetos) at top — load-bearing rules in the agent's strongest attention window.
- Added research gate to step 5 (`classes` prop): MUST complete research steps 1–5 BEFORE consulting the decision matrix.
- Removed historical "REVOKED as of 2026-05-13" lore from agent context (still in `ORCHESTRATOR.md` for operator reference).
- Added inputs list pointing at the new `PICASSO_COMPONENT_DESIGN_PATTERNS.md` (repo root, cherry-picked from master), `references/design-patterns-addendum.md`, `references/code-standards.md`, `references/practices.md`.
- `lessons-learned.md` demoted to audit-only (no longer in contextPack); graduated patterns live in `practices.md`.

### v1

See `archive/PROMPT-light-v1.md` for the prior version (375 lines, used through 2026-05-20).
