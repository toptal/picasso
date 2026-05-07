# PROMPT-heavy.md — MUI v4 + JSS → `@base-ui/react` + Tailwind (Tier 1 type fixes, Tier 2, Tier 3, sibling packages, provider)

**Path:** Heavy. **Used for:** Tier 1 cleanup (peer-dep + type-only fixes + small re-exports — Form, FormLayout, ModalContext, Note, Typography, Container, FormLabel, Grid, Notification, Menu, Utils), Tier 2 heavy rewrites (Checkbox, Radio, Tooltip, FileInput, Popper), Tier 3 composites (Accordion, Dropdown, Page) + OutlinedInput mixed-state, Tier 4 sibling packages (picasso-charts, picasso-query-builder, picasso-rich-text-editor), and Tier 5 provider runtime.

**Source:** Verbatim from [`docs/modernization/PI-4318-P1-MOD-01-migration-plan.md`](../modernization/PI-4318-P1-MOD-01-migration-plan.md) §5.3.

**Versioned.** Iterate; bump version on the `## v<N>` heading. Loaded into the agent for all non-Tier-0 component migrations; the orchestrator selects this prompt via `workflow.promptFor(item)` based on the manifest's `tier` field.

---

## v1

You are migrating a Picasso component from MUI v4 (@material-ui/core)
+ JSS to @base-ui/react + Tailwind. This is a full rewrite — both the
component primitive and the styling system change.

You have read access to:
- reference/Button.tsx — canonical Tailwind reference (post-migration).
- reference/HEAVY-EXAMPLE.tsx — canonical heavy-path output.
- rules/styling.md — Tailwind class composition rules.
- rules/api-preservation.md — prop surface rules.
- rules/jss-to-tailwind-crib.md — JSS pattern → Tailwind pattern table.
- rules/base-ui-react-api-crib.md — @base-ui/react patterns.
- tokens/picasso-tailwind-tokens.md — available tokens.

You are migrating: packages/base/<NAME>

Your task:

1. Replace @material-ui/core imports:
   - @material-ui/core/<X>          → @base-ui/react/<X> when available.
                                      For primitives missing in @base-ui/react,
                                      consult rules/base-ui-react-api-crib.md.
   - @material-ui/core/styles       → delete; styles move to Tailwind.
   - @material-ui/core/PicassoTheme → delete; tokens via Tailwind classes.

2. Replace JSS with Tailwind:
   - Every createStyles/makeStyles object becomes either:
     a) inline className={cx(...)} for static styles, or
     b) a helper function in styles.ts returning string[] (Button pattern).
   - JSS parent-refs ("&$expanded") convert to Tailwind pseudo-classes
     or conditional class arrays driven by component state. Common case:
     data-attribute selectors (data-[state=open]:bg-blue-500).
   - Raw hex / px values: replace with Picasso Tailwind tokens.
     Where no token exists, keep the literal + add comment:
     // TODO(tokens): <description>

3. Preserve the public prop surface EXCEPT where a prop leaks an MUI v4
   type (e.g., classes: Classes) that cannot be preserved. Removed props
   go to docs/migration/<Component>-diff.json with codemod=required.

4. Update package.json:
   - Remove @material-ui/core from dependencies AND peerDependencies.
   - Add @base-ui/react if used (current pin: 1.4.1) — **use `"^1.4.1"`,
     NOT `"1.4.1"`**. Picasso's syncpack rule requires caret-prefix for
     npm deps (`HighestSemverMismatch` failure otherwise).
   - **Workspace package deps use exact version, no caret/tilde.** When
     adding a `@toptal/picasso-*` dependency, use the package's
     published version verbatim (e.g. `"2.0.4"`). Caret on a workspace
     dep fails CI with `LocalPackageMismatch`. Look up the version with
     `cat packages/<pkg>/package.json | jq .version` first.
   - Add @toptal/picasso-tailwind-merge (peer) and
     @toptal/picasso-tailwind (peer) if not already present.
   - **Drop the `react: < 19.0.0` upper bound** from `peerDependencies`
     if present. Replace with `react: ">=16.12.0"` (or current floor).
     Per v4 §2.6, Picasso lifts the React 18-era cap as part of every
     Tier 0/1/2/3 migration.
   - **After editing any package.json deps, run `yarn install` from
     the repo root and stage `yarn.lock` in the same commit.** Missing
     yarn.lock is the single most common reason CI's "Build packages"
     step fails on dep-bumping migrations. If a runtime dep used at
     compile time is added (e.g. `withClasses` consuming
     `@toptal/picasso-tailwind-merge`), the package needs it as a
     `devDependency` for its own `tsc -b` resolution, not just as a
     `peerDependency` — peerDeps are only seen by *consumers* of the
     package, not by the package's own build.

5. **Conditional output shape: `classes` prop preservation (v4 §2.3, scoped).**
   `withClasses` is a **preservation** mechanism, not a NET ADD. Apply
   it only if the component currently exposes `classes` in its public
   Props interface — directly (`classes?: { ... }`) or by extending
   `StandardProps` (which bundles `classes: Classes` via `JssProps`).
   If the component has no `classes` prop today, **skip this step
   entirely** — adding it would be net-new API, not preservation.

   Heavy-path migrations are **more likely** to need this than light
   path: Tier 2/3 components still on MUI v4 + JSS often have `classes`
   either directly or via StandardProps, and the original MUI v4
   contract accepted MUI's slot keys. v4 §2.3 is the migration of that
   contract into the Tailwind world — but only where the contract
   actually existed.

   Quick check before deciding:
   - `grep -rE '^\s*classes\??:' packages/base/<NAME>/src` — direct
   - `grep -rE 'extends.*StandardProps' packages/base/<NAME>/src` — inherited
   If both come up empty, skip §5 and move on.

   Components that need this (per the manifest audit): Button, Modal,
   Container, Notification, FormLabel, Typography, Radio, Accordion,
   Dropdown, OutlinedInput. Components that **don't** (skip): Backdrop,
   Badge, Drawer, Slider, Switch, Tabs, ModalContext, Grid, Menu, Utils,
   Form, FormLayout, Note, Checkbox, Tooltip, FileInput, Popper, Page.

   When applicable, expose `classes` on the **public** component (not
   just an internal Base). For components currently inheriting `classes:
   Classes` via `StandardProps`, narrow the type at the public Props
   interface to `Partial<Record<*ClassKey, string>>` — this is a real
   API narrowing (consumers using arbitrary string keys break). Document
   the slot-key set in `docs/migration/<Component>-diff.json` with
   `codemod=required`.

   Pattern:
   ```ts
   import { withClasses } from '@toptal/picasso-utils'

   // Declare the slot keys this component exposes (see the per-component
   // plan file's "Slot keys" section for the canonical list).
   export type AccordionClassKey = 'root' | 'header' | 'panel' | 'expanded'

   const baseClasses: Record<AccordionClassKey, string> = {
     root: 'border border-gray-200 rounded',
     header: 'flex items-center justify-between p-4 cursor-pointer',
     panel: 'p-4 border-t border-gray-200',
     expanded: 'bg-gray-50',
   }

   export interface Props {
     // ... other props ...
     classes?: Partial<Record<AccordionClassKey, string>>
   }

   export const Accordion: React.FC<Props> = ({ classes, ...rest }) => {
     const merged = withClasses(baseClasses, classes)
     // Use merged.root, merged.header, merged.panel, etc. when composing
     // Tailwind classNames per slot.
   }
   ```

   Rules:
   - **Slot keys come from the per-component plan file** (`docs/migration/components/<NAME>.md`, "Slot keys" section). Do NOT invent new keys; keep the migration's API alignable with the v3 plan.
   - For JSS parent-refs (`'&$expanded': { ... }`) the slot key replaces the parent-ref name. Heavy migrations of Accordion/Page/etc. exemplify this.
   - The shim does NOT cover MUI nested-state selectors (`& .Mui-disabled`, `&$expanded` chains). For Tier 2/3 components migrating from JSS that USED these, prefer Tailwind data-attribute selectors driven by the `@base-ui/react` component's `data-state` (e.g. `data-[state=open]:bg-blue-500` on the slot's class string).
   - `withClasses` lives in `@toptal/picasso-utils`; ensure the migrating package depends on it (`@toptal/picasso-utils` is already a transitive dep across most base/* via picasso-shared/picasso-provider).

6. Do NOT change:
   - test.tsx assertions
   - story files
   - file locations or export names

Output: file edits only. No explanations.

### Acceptance criteria — iterate to working, then run full

You have Bash access for **verification only** (`yarn typecheck`, `yarn workspace:*`, `yarn davinci-qa:*`, `yarn lint:*`, `yarn cypress:*`, `yarn happo:*`, `yarn info:*`, `npm view:*`, `git diff/status/log/show/blame`). Use it to self-verify between edits — don't wait for the orchestrator's outer-loop gate.

For the fastest inner-loop feedback on lint, scope to the migrating package's src instead of running repo-wide:

```bash
yarn davinci-syntax lint code --check packages/base/<NAME>/src
# Auto-fix on the same scope:
yarn davinci-syntax lint code packages/base/<NAME>/src
```

This is ~12x faster than `yarn lint` (which lints the whole repo). Use the scoped form for iterative fixing; the orchestrator's outer-loop gate runs the same scoped command for its lint stage.

If `--with-mcp` was passed to the orchestrator, you also have **Playwright MCP** tools and a Storybook server running at `http://localhost:9001`. Use them to verify visual + runtime behavior:

- `mcp__playwright__browser_navigate` to load story URLs (e.g. `http://localhost:9001/?path=/story/components-button--default`).
- `mcp__playwright__browser_screenshot` for pixel-level inspection.
- `mcp__playwright__browser_console_logs` to catch runtime warnings.
- `mcp__playwright__browser_hover` / `browser_click` to exercise interaction states (default / hover / focused / disabled).

Inspect at minimum the default + hover + focused + disabled stories. If `console.error` fires during render, the migration is wrong even if the gate passes.

**Working acceptance** (run for regular feedback during iteration):
- `yarn workspace @toptal/picasso-<NAME> build:package` passes (types + emit)
- `yarn davinci-qa unit --testPathPattern packages/base/<NAME>` passes
- `yarn davinci-syntax lint code --check packages/base/<NAME>/src` passes (zero errors)
- (if Storybook + Playwright MCP available) story renders cleanly: default + hover + focused + disabled states without `console.error`

**Full acceptance** (run before declaring done):
- working acceptance passes
- `yarn typecheck` passes (full repo)
- (if applicable) cypress component spec passes
- Happo report green or designer-approved diffs only

**Mandatory before exit:** run `yarn davinci-syntax lint code packages/base/<NAME>/src` (auto-fix mode, no `--check`) once, then `yarn davinci-syntax lint code --check packages/base/<NAME>/src` to verify zero errors. The orchestrator's outer-loop gate runs the same scoped command — if you exit before lint passes, the gate fails identically and you've wasted an iteration. **Do not** weaken public types (e.g. fall back to `any`) just to placate a lint warning. Use the **boundary-cast** pattern (`as ComponentName.Props['key']`) hoisted into a helper return type or local typed binding instead — see `rules/base-ui-react-api-crib.md` §"Type alignment at the boundary". Avoid sprinkling inline casts at the JSX call site; reviewers will ask you to consolidate them.

---

## Changelog

- **v1** — Lifted verbatim from migration plan v3 §5.3 (May 2026 re-audit). Replaces the v1 PROMPT.md (archived under [`archive/PROMPT-v1-deprecated.md`](./archive/PROMPT-v1-deprecated.md)) which incorrectly named `@mui/base` as the target.
