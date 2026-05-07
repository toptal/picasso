# PROMPT-light.md — `@mui/base` → `@base-ui/react` (Tier 0)

**Path:** Light. **Used for:** Tier 0 components (Backdrop, Badge, Button, Drawer, Modal, Slider, Switch, Tabs) and the `@mui/base` portion of mixed-state components (Dropdown, OutlinedInput).

**Source:** Verbatim from [`docs/modernization/PI-4318-P1-MOD-01-migration-plan.md`](../modernization/PI-4318-P1-MOD-01-migration-plan.md) §5.2.

**Versioned.** Iterate; bump version on the `## v<N>` heading. Loaded into the agent at every Tier 0 component migration; the orchestrator selects this prompt via `workflow.promptFor(item)` based on the manifest's `tier` field.

---

## v1

You are migrating a Picasso component from @mui/base to @base-ui/react.
Tailwind is already in place; the component already uses cx/twMerge for
class composition. Your task is the package swap + API alignment, not a
full rewrite.

You have read access to:
- reference/Button.tsx — canonical @base-ui/react migration (light path).
- reference/Switch.tsx — minimal @base-ui/react migration.
- rules/base-ui-react-api-crib.md — @base-ui/react component patterns.
- rules/api-preservation.md — prop surface rules.

You are migrating: packages/base/<NAME>

Your task:

1. Replace @mui/base imports with @base-ui/react equivalents:
   - @mui/base/<X>           → @base-ui/react/<X> (when API matches)
   - @mui/base/use<X>        → @base-ui/react/use<X> (when hook exists)
   - For API differences, consult rules/base-ui-react-api-crib.md.

2. Update package.json:
   - Remove @mui/base from dependencies.
   - Add @base-ui/react (current pin: 1.4.1).
   - **Drop the `react: < 19.0.0` upper bound** from `peerDependencies`
     if present. Replace with `react: ">=16.12.0"` (or current floor).
     Per v4 §2.6, `@base-ui/react` supports React 19 and Picasso lifts
     the React 18-era cap as part of every Tier 0/1 migration.
   - **After editing any package.json deps, run `yarn install` from
     the repo root and stage `yarn.lock` in the same commit.** Missing
     yarn.lock is the single most common reason CI's "Build packages"
     step fails on dep-bumping migrations. Validate before commit:
     `git status` shows `yarn.lock` modified IFF you touched any
     `dependencies` / `devDependencies` / `peerDependencies`. If deps
     changed but yarn.lock didn't, the resolution didn't move — verify
     the new dep is already in the lockfile (`grep '"@base-ui/react@' yarn.lock`).

3. Preserve the public prop surface. When @base-ui/react's types narrow
   vs Picasso's wider public types (e.g. polymorphic components where
   Picasso accepts MouseEvent<HTMLButtonElement & HTMLAnchorElement>
   but @base-ui/react accepts MouseEvent<HTMLButtonElement>), do NOT
   change the public type. Cast at the **type boundary** — hoisted
   into a helper's return type or a local typed binding — NOT sprinkled
   inline in JSX:

       // Preferred — hoist the cast into the helper's return type:
       const getClickHandler = (
         loading?: boolean,
         handler?: Props['onClick']
       ): BaseUIButton.Props['onClick'] =>
         (loading ? noop : handler) as BaseUIButton.Props['onClick']
       // Then in JSX, no cast needed:
       <BaseUIButton onClick={getClickHandler(loading, onClick)} />

       // Avoid — call-site casts proliferate and re-open the trust
       // question at every render:
       <BaseUIButton onClick={getClickHandler(loading, onClick) as BaseUIButton.Props['onClick']} />
       <BaseUIButton {...(rest as BaseUIButton.Props)} ref={ref as React.Ref<HTMLElement>} />

   `forwardRef<HTMLButtonElement, Props>(...)` already types `ref`
   correctly — don't cast it at the JSX site. Spreading `{...rest}`
   with a cast (`{...(rest as BaseUIButton.Props)}`) is `// @ts-ignore`
   in disguise; if `rest` doesn't conform, drop the offending Picasso-only
   prop before spreading. NEVER fall back to `any` — that violates
   api-preservation.md and triggers lint errors.

   See `rules/base-ui-react-api-crib.md` §"Polymorphic Button" for
   the `nativeButton + render` pattern and §"Type alignment at the
   boundary" for the hoisted-cast pattern. **Do not add a runtime
   `typeof`/`isValidAs` guard for the `as` prop** — TypeScript already
   constrains it; reviewers will ask you to remove it (see api-crib
   §"Don't add runtime `typeof` guards").

   If a prop genuinely must change (a public type that cannot be
   preserved even with casting), add it to
   docs/migration/<Component>-diff.json with codemod=required.

4. Tailwind class composition (cx/twMerge usage) stays as-is — that
   was the win of the @mui/base era. Don't rewrite styles.

5. **Conditional output shape: `classes` prop preservation (v4 §2.3, scoped).**
   `withClasses` is a **preservation** mechanism, not a NET ADD. Apply
   it only if the component currently exposes `classes` in its public
   Props interface — directly (`classes?: { ... }`) or by extending
   `StandardProps` (which bundles `classes: Classes` via `JssProps`).
   If the component has no `classes` prop today, **skip this step
   entirely** — adding it would be net-new API, not preservation.

   Quick check before deciding:
   - `grep -rE '^\s*classes\??:' packages/base/<NAME>/src` — direct
   - `grep -rE 'extends.*StandardProps' packages/base/<NAME>/src` — inherited
   If both come up empty, skip §5 and move on.

   Components that need this (per the manifest audit): Button, Modal,
   Container, Notification, FormLabel, Typography, Radio, Accordion,
   Dropdown, OutlinedInput. Components that **don't** (skip): Backdrop,
   Badge, Drawer, Slider, Switch, Tabs, ModalContext, Grid, Menu, Utils,
   Form, FormLayout, Note, Checkbox, Tooltip, FileInput, Popper, Page.

   When applicable, expose `classes` on the **public** component (e.g.
   `Button.tsx`), not just the internal Base (e.g. `ButtonBase.tsx`).
   Re-export the `*ClassKey` type from the public component so consumers
   can type their overrides.

   Pattern:
   ```ts
   import { withClasses } from '@toptal/picasso-utils'

   // Declare the slot keys this component exposes (see the per-component
   // plan file's "Slot keys" section for the canonical list).
   export type ButtonClassKey = 'root' | 'label' | 'icon'

   const baseClasses: Record<ButtonClassKey, string> = {
     root: 'inline-flex items-center px-4 py-2',
     label: 'font-semibold',
     icon: 'mr-2',
   }

   export interface Props {
     // ... other props ...
     classes?: Partial<Record<ButtonClassKey, string>>
   }

   export const Button: React.FC<Props> = ({ classes, ...rest }) => {
     const merged = withClasses(baseClasses, classes)
     return (
       <BaseUIButton className={merged.root}>
         <span className={merged.icon}>...</span>
         <span className={merged.label}>...</span>
       </BaseUIButton>
     )
   }
   ```

   Rules:
   - **Slot keys come from the per-component plan file** (`docs/migration/components/<NAME>.md`, "Slot keys" section). Do NOT invent new keys.
   - The `classes` prop is `Partial<Record<*ClassKey, string>>` — every key is optional; values are Tailwind class strings.
   - `withClasses` is dependency-light (only `@toptal/picasso-tailwind-merge`); add `@toptal/picasso-utils` to deps if not already present.
   - The shim does NOT cover MUI nested-state selectors (`& .Mui-disabled`, `&$expanded`) or generated MUI classes (`.MuiButton-root`). Those rare cases need codemods or manual consumer fixes; flag them in the diff JSON instead of trying to preserve them here.

6. Do NOT change:
   - test.tsx assertions (snapshots OK to regenerate)
   - story files (they exercise the public API)
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
- `mcp__playwright__browser_console_logs` to catch runtime warnings (e.g. Base UI's `nativeButton` warning).
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

**Mandatory before exit:** run `yarn davinci-syntax lint code packages/base/<NAME>/src` (auto-fix mode, no `--check`) once, then `yarn davinci-syntax lint code --check packages/base/<NAME>/src` to verify zero errors. The orchestrator's outer-loop gate runs the same scoped command — if you exit before lint passes, the gate fails identically and you've wasted an iteration. **Do not** weaken public types (e.g. fall back to `any`) just to placate a lint warning. Use the call-site cast pattern (`as ComponentName.Props['key']`) instead, per `rules/api-preservation.md`.

---

## Changelog

- **v1** — Lifted verbatim from migration plan v3 §5.2 (May 2026 re-audit). Replaces the v1 PROMPT.md (archived under [`archive/PROMPT-v1-deprecated.md`](./archive/PROMPT-v1-deprecated.md)) which incorrectly named `@mui/base` as the target.
