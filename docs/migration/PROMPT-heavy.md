# PROMPT-heavy.md — MUI v4 + JSS → `@base-ui/react` + Tailwind (Tier 1 type fixes, Tier 2, Tier 3, sibling packages, provider)

**Path:** Heavy. **Used for:** Tier 1 cleanup (peer-dep + type-only fixes + small re-exports — Form, FormLayout, ModalContext, Note, Typography, Container, FormLabel, Grid, Notification, Menu, Utils), Tier 2 heavy rewrites (Checkbox, Radio, Tooltip, FileInput, Popper), Tier 3 composites (Accordion, Dropdown, Page) + OutlinedInput mixed-state, Tier 4 sibling packages (picasso-charts, picasso-query-builder, picasso-rich-text-editor), and Tier 5 provider runtime.

**Source:** Verbatim from [`docs/modernization/PI-4318-P1-MOD-01-migration-plan.md`](../modernization/PI-4318-P1-MOD-01-migration-plan.md) §5.3.

**Versioned.** Iterate; bump version on the `## v<N>` heading. Loaded into the agent for all non-Tier-0 component migrations; the orchestrator selects this prompt via `workflow.promptFor(item)` based on the manifest's `tier` field.

---

## v2

You are migrating a Picasso component from MUI v4 (`@material-ui/core`) + JSS to `@base-ui/react` + Tailwind. This is a full rewrite — both the component primitive and the styling system change.

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
- `rules/base-ui-react-api-crib.md` — `@base-ui/react` component patterns.
- `rules/styling.md` — Tailwind class composition rules.
- `rules/jss-to-tailwind-crib.md` — JSS pattern → Tailwind pattern table + WORKED EXAMPLES (read in full before step 2).
- `rules/package-and-build.md` — pnpm/lockfile policy + build-before-snapshot precondition.
- `references/visual-verification.md` — Playwright MCP workflow + worked compensation examples.
- `references/happo-iteration.md` — Happo classification matrix + worked diff example.
- `decisions/classes-audit.md` — starting hypothesis for step 5 (the `classes` decision matrix).
- `tokens/picasso-tailwind-tokens.md` — available Picasso Tailwind tokens.
- `reference/Button.tsx` — canonical Tailwind reference (post-migration).
- `reference/HEAVY-EXAMPLE.tsx` — canonical heavy-path output.

You are migrating: `packages/base/<NAME>`

## Execution steps

### 1. Imports

Replace `@material-ui/core` imports:

- `@material-ui/core/<X>` → `@base-ui/react/<X>` when available. For primitives missing in `@base-ui/react`, consult `rules/base-ui-react-api-crib.md`.
- `@material-ui/core/styles` → delete; styles move to Tailwind.
- `@material-ui/core/PicassoTheme` → delete; tokens via Tailwind classes.

### 2. JSS → Tailwind (MANDATORY: read `rules/jss-to-tailwind-crib.md` IN FULL before editing styles.ts)

The cribsheet's "Worked examples" section is the single highest-leverage doc for this step. Read it fully — it covers:

- JSS parent-refs (`&$expanded`) → Tailwind data-attribute selectors
- Dynamic class from prop state → conditional class array (`createXxxClassNames` pattern)
- Raw hex / px → Picasso Tailwind tokens (with `// TODO(tokens):` fallback)
- JSS pseudo `&:hover:not(:disabled)` → Tailwind `hover:enabled:*`
- `theme.spacing(N)` → `gap-*` / `space-y-*` utilities

Then apply:

- Every `createStyles`/`makeStyles` object becomes either:
  1. inline `className={cx(...)}` for static styles, or
  2. a helper function in `styles.ts` returning `string[]` (Button pattern — pure functions, no React inside).
- JSS parent-refs (`&$expanded`) convert to Tailwind pseudo-classes or conditional class arrays driven by component state. Common case: data-attribute selectors (`data-[state=open]:bg-blue-500`).
- Raw hex / px values: replace with Picasso Tailwind tokens. Where no token exists, keep the literal + `// TODO(tokens): <description>` comment.

### 3. API preservation

Preserve the public prop surface EXCEPT where a prop leaks an MUI v4 type (e.g., `classes: Classes`) that cannot be preserved. Removed props go to `docs/migration/<Component>-diff.json` with `codemod=required`.

When `@base-ui/react`'s types narrow vs Picasso's wider public types, cast at the **type boundary** — hoisted into a helper's return type or local typed binding — NOT sprinkled inline in JSX. See `rules/api-preservation.md` and `rules/base-ui-react-api-crib.md` §"Type alignment at the boundary".

### 4. `package.json` & lockfile

Apply `rules/package-and-build.md` IN FULL. Highlights:

- Remove `@material-ui/core` from `dependencies` AND `peerDependencies`.
- Caret prefix for npm deps (`"^1.4.1"`); exact for workspace deps (no caret).
- Add `@toptal/picasso-tailwind-merge` (peer) and `@toptal/picasso-tailwind` (peer) if not already present.
- Drop the `react: < 19.0.0` upper bound from `peerDependencies`.
- Run plain `pnpm install` from repo root; stage `pnpm-lock.yaml` in the same commit.
- For build-time deps (e.g., `withClasses` consuming `@toptal/picasso-tailwind-merge`): add as `devDependency`, not only as `peerDependency` — peerDeps are only seen by consumers, not by the package's own build.
- STOP if the lockfile diff is > 1000 lines OR you see `link:packages/X` lines being REPLACED with expanded peer-suffix form.

### 5. The `classes` prop — RESEARCH FIRST, THEN DECIDE

The cross-tier audit (`decisions/classes-audit.md`, 2026-05-11) catalogued each component's `classes` API surface. The audit is your **starting hypothesis**, not a script — Tier 2/3 components have richer slot vocabularies and more potential edge cases than Tier 0/1. Verify per-component before editing.

**Research steps (MUST complete all 5 before consulting the decision matrix):**

1. Read the source: confirm what `extends` the Props uses, whether the body reads `classes` (and how), and whether there's a runtime backstop (`classes: _classes`).
2. `rg` internal callsites in the repo: `rg "<Component>.*classes" packages/`.
3. Cross-reference with `decisions/classes-audit.md` §3 / §4 / §5 for this tier.
4. `gh search code` for EXTERNAL consumer usage if Tier 2/3 (audit §6 / §9 has the per-component external counts).
5. If you're migrating Dropdown or OutlinedInput, confirm the locally narrowed shape per §Tier 3.b — DO NOT drop the prop.

**GATE: Do not proceed to the decision matrix until all 5 research steps are complete. If you skip any, your decision will be wrong.**

**Decision matrix (Tier 1, 2, 3):**

| Your finding | Action |
|---|---|
| Tier 1 cleanup-only (Form, FormLabel, Grid, Note, Menu, FormLayout, ModalContext, Utils — `target_path: 'none'`) | No-op on `classes` — no source change. |
| Tier 1 vestigial classes (Container, Typography, Notification) — audit-verified 0 internal/external | `extends Omit<StandardProps, 'classes'>` + runtime backstop. Bundle into Tier 1 cleanup PR. |
| Tier 1 FormControlLabel — used internally by Switch/Radio/Checkbox | KEEP locally narrowed `classes?: { root?, label? }`. |
| Tier 2 (Checkbox, Radio, Tooltip, FileInput, Popper) | `Omit` drop public. Internal MUI plumbing rewrites with the `@base-ui/react` migration. Audit-verified 0 external real usage. |
| Tier 3.a (Accordion, Page) | `Omit` drop public. Rewrite internal slot-routing on `@base-ui/react` parts. |
| Tier 3.b (Dropdown, OutlinedInput) | KEEP locally narrowed `classes?: { ... }`. Dropdown: `{ popper, content }`; OutlinedInput: `{ input, root }`. Real external consumers depend on these. |
| Audit contradicts source state | STOP. Update the audit doc; do not proceed unilaterally. |

The `withClasses` helper from `@toptal/picasso-utils` is **deprecated** — do not introduce new usages.

### 6. File preservation

Preserve every `*.example.tsx`, `*.story.tsx`, `test.tsx`, and `story/index.jsx` file. Migration PRs should NOT delete or rename these unless the public API genuinely changed. If a test fails post-migration, the FIRST move is to verify the migrating package builds cleanly (`pnpm -F @toptal/picasso-<NAME> build:package`), THEN regenerate snapshots — see `rules/package-and-build.md` §"Build-before-snapshot precondition".

**Read the `@base-ui/react` source for any compound part you're working with.** Look at `node_modules/@base-ui/react/<group>/<part>/<Part>.js` for inline-style assignments inside `useMemo` / `getStyle` / render. The library may already provide centering / positioning / sizing via modern CSS Transforms 2 properties (`translate:` / `rotate:` / `scale:`) that compose with Tailwind's `transform:`. See `references/visual-verification.md` §"Read the `@base-ui/react` source BEFORE adding CSS compensation".

### 7. Changeset

Add a `.changeset/<name>.md` entry. Apply `references/practices.md` §Changesets + `references/code-standards.md` §"Changeset conventions" in full. Required content:

- **Pick the bump tier from the standard taxonomy** — migration is NOT auto-major:
  - `patch` — default for a clean library swap with identical public API + types + behavioral parity. `@mui/base` / `@material-ui/core` are Picasso `dependencies`, not consumer peer-deps; their removal is invisible to consumers. The `react: < 19.0.0` peer cap widening is not breaking. CI gates (Jest, Lint, Happo) are the contract that parity holds.
  - `minor` — only if the migration deliberately adds a new prop, prop value, or opt-in behavior.
  - `major` — ONLY when consumer usage actually breaks (removed/renamed prop, narrowed type, removed value, default flipped to change visible behavior, layout-shifting CSS). Name the concrete break — if you can't, it's not major.
- YAML frontmatter selecting the migrating package and the bump tier you chose.
- A "behavioral parity" framing.
- For `patch`: one-line "Re-implement on `@base-ui/react`; public API unchanged" is sufficient.
- For `minor` / `major`: name the new surface or the breaking surface. For Tier 2/3 with richer slot vocabularies, be explicit about which slots are now consumer-visible via `className` vs which are internal-only when that's part of the new surface.
- For any `@deprecated` props with `_unused` destructure: name them and the planned removal version.

### 8. PR description (mandatory)

The orchestrator opens the PR with `bin/migration-diff.sh report` output as the body, which is mechanical. That's necessary but insufficient — reviewers need YOUR narrative on top. Write it to `migration-runs/<run-date>/<Component>/pr-description.md` BEFORE exit.

Required sections (each ≤ 4 sentences):

```markdown
## Summary

<One paragraph. What this PR migrates, at a high level how — compound parts assembled, classes-shim policy applied, JSS slots collapsed, etc. 15-second comprehension target.>

## Decisions

- <Decision 1>: <what you chose> because <why>. <cite rule/decision doc if one applies>
- <Decision 2>: ...
(2-4 bullets focused on choices a reviewer would otherwise ask about: classes-shim path, behavioral parity shims, patches applied to vendor deps, JSS-to-Tailwind compromises.)

## Limitations / Out-of-scope

- <What this PR doesn't address + WHY>.
- <Known edge case worth mentioning>.

## Verification

- **Local gate stages passed**: build, tsc, lint, jest, cypress, happo.
- **Runtime check (Playwright)**: <stories/states exercised>.
- **Visual parity**: <Happo verifier result against base SHA>.
```

Output: file edits only. No explanations.

## Acceptance — iterate to working, then run full

You have Bash access for verification only. Use it to self-verify between edits.

**Fast inner-loop lint** (scoped to migrating package's src):

```bash
pnpm davinci-syntax lint code --check packages/base/<NAME>/src
# Auto-fix:
pnpm davinci-syntax lint code packages/base/<NAME>/src
```

**Working acceptance** (iterate to pass):

- `pnpm -F @toptal/picasso-<NAME> build:package` exits 0.
- `pnpm davinci-syntax lint code --check packages/base/<NAME>/src` exits 0.
- `pnpm -F @toptal/picasso-<NAME> test --runInBand` exits 0 (after snapshot regeneration if needed).
- Playwright runtime check passed per `references/visual-verification.md` §"Mandatory runtime check": zero `[error]` console entries, every story+interaction-state captured, baseline-vs-local diff resolved.

**Full acceptance** (required before declaring done):

- All working-acceptance checks pass.
- Happo verifier returns green for the migrated component per `references/happo-iteration.md` §"Exit criterion", OR all remaining diffs are flagged INTENTIONAL with operator-approved entry in `docs/migration/components/<Component>.md`.
- PR description written to `migration-runs/<run-date>/<Component>/pr-description.md`.
- Changeset added under `.changeset/<name>.md` with all required content per step 7.

**Mandatory runtime check (when `--with-mcp` is active)**: see `references/visual-verification.md` for the full Playwright MCP workflow. Tier 2/3 with richer slot vocabularies need MORE state coverage than Tier 0 — every distinct slot's hover/focus/disabled/active states should be exercised.

**Visual regression authority**: Happo. See `references/happo-iteration.md` for the classification matrix and computed-style-diff requirement.

---

## Changelog

### ## v2 (2026-05-21)

Split-prompt overhaul:

- Slimmed from 404 → ~210 lines. Extracted pnpm/build to `rules/package-and-build.md`, visual verification to `references/visual-verification.md`, Happo iteration to `references/happo-iteration.md`.
- Added STOP rules block (7 hard vetos) at top.
- Added research gate to step 5 (`classes` prop): MUST complete research steps 1–5 BEFORE consulting the decision matrix.
- Step 2 (JSS → Tailwind) now MANDATES reading `rules/jss-to-tailwind-crib.md` IN FULL before editing styles.ts. Cribsheet extended with 5 worked examples to attack the hallucination hotspot.
- Removed historical "REVOKED as of 2026-05-13" lore from agent context.
- Added inputs list pointing at the new `PICASSO_COMPONENT_DESIGN_PATTERNS.md` (repo root), `references/design-patterns-addendum.md`, `references/code-standards.md`, `references/practices.md`.
- `lessons-learned.md` demoted to audit-only (no longer in contextPack); graduated patterns live in `practices.md`.

### v1

See `archive/PROMPT-heavy-v1.md` for the prior version (404 lines, used through 2026-05-20).
