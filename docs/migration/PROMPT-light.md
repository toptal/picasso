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
   - Add @base-ui/react (current pin: 1.4.1) — **use `"^1.4.1"`, NOT
     `"1.4.1"`**. Picasso's syncpack rule requires caret-prefix for npm
     deps; an exact pin will fail the CI "Static checks" job
     (`HighestSemverMismatch`).
   - **Workspace package deps use exact version, no caret.** When adding
     a `@toptal/picasso-*` dependency, use the package's published
     version verbatim (e.g. `"2.0.4"`, not `"^2.0.0"`). Caret on a
     workspace dep fails CI with `LocalPackageMismatch`. Look up the
     version with `cat packages/<pkg>/package.json | jq .version` first.
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

5. **The `classes` prop — research your component, then act (revised 2026-05-11).**

   Cross-tier audit (`docs/migration/decisions/classes-audit.md`) ran 2026-05-11 and catalogued each component's `classes` API surface. The audit is your **starting hypothesis**, not a script — sources drift, edge cases exist. Verify per-component before editing.

   ### Audit hypothesis for Tier 0 + Tier 1 (your starting context)

   - **Tier 0 components** (Backdrop, Badge, Button, Drawer, Modal, Slider, Switch, Tabs): `classes` was already broken since the @mui/base migration step (`@mui/base/Button` etc. removed `classes` in favor of `slots`/`slotProps`). Consumer's classes silently dropped + React DOM-leak warning (`Invalid value for prop \`classes\` on <button>`). Internal Picasso usage: 0. External real usage: 0 in the audit (exception: Modal — see audit §6 / §9).
   - **Tier 1 cleanup-only components with `classes`** (Container, Typography, Notification): inherited from `StandardProps` but vestigial — the component bodies don't read it. Internal Picasso: 0. External real usage: 0.
   - **Tier 1 — `FormControlLabel`**: locally narrows to `classes?: { root?, label? }` and IS used internally by Switch/Radio/Checkbox. KEEP this surface unchanged during the cleanup migration.
   - **Tier 1 components without `classes`** (FormLabel, Grid, Form, Note, Menu, FormLayout, ModalContext, Utils): no `classes` API exists. No-op.

   ### Required research steps — perform BEFORE editing

   1. **Read the public `Props` interface** in the component's main `.tsx`:
      - Does it `extends StandardProps`? (Open-ended `classes` inherited.)
      - Does it declare LOCAL `classes?: { ... }`? (Narrowed surface — KEEP.)
      - Both? Local declaration shadows the inherited one.

   2. **Read `styles.ts` (if any)**. `createStyles({ root: {...}, ... })` keys are the historical slot vocabulary.

   3. **Grep the component body** for `classes.` / `classes?.` access. Declared but never read = vestigial. Read = actually consumed.

   4. **Multiline rg internal callsites**:
      ```bash
      rg --multiline --multiline-dotall -U \
        '<<Name>\b[^>]*?\bclasses\s*=\s*\{\{' \
        -g '*.tsx' -g '*.ts' packages/
      ```

   5. **Cross-reference with audit** (`docs/migration/decisions/classes-audit.md` §3 + §6). Confirm your component's row matches your findings. If it DOESN'T match, stop and update the audit doc — don't proceed on a stale assumption.

   ### Decision matrix (apply based on YOUR findings)

   | Your finding | Action |
   |---|---|
   | Extends `StandardProps` only, body never reads `classes`, 0 internal callsites, audit says 0 external | **Drop public `classes`** via `extends Omit<StandardProps, 'classes'>` + destructure `classes: _classes` runtime backstop. No diff JSON. Pattern: PR #4947 (Button). |
   | Extends `StandardProps`, body reads `classes` but for slots that disappear under the new stack (MUI v4 wrapper being replaced) | Drop public `classes` via `Omit`. Rewrite internal slot-routing during the migration (slots → @base-ui/react part-level `className`). Note in PR description. |
   | Locally narrowed `classes?: { slotA, slotB }` AND read in body AND audit shows external real usage | **KEEP narrowed surface**. Don't change the type signature. Port the slot-routing to @base-ui/react part `className`. |
   | Doesn't extend `StandardProps` (only `BaseProps`) | **No-op for classes**. Continue the rest of the migration. |
   | Audit contradicts source state | STOP. Update `classes-audit.md`. Don't proceed. |
   | Audit says vestigial but you find non-trivial real usage (internal or external — re-run gh search code + inspect textMatches) | STOP. Audit is stale. Update §3 / §5 / §6 of `classes-audit.md` with the new finding and re-evaluate. |

   ### Reference pattern — `Omit<StandardProps, 'classes'>` drop

   ```ts
   import type { StandardProps, ButtonOrAnchorProps, TextLabelProps } from '@toptal/picasso-shared'

   export interface Props
     extends Omit<StandardProps, 'classes'>,    // ← Omit classes here
             TextLabelProps,
             ButtonOrAnchorProps {
     // ... other props ...
     // NO `classes?` declaration. Don't add one back.
   }
   ```

   Apply Omit in BOTH the public component and any internal Base wrapper (e.g. `Button.tsx` AND `ButtonBase.tsx`) if both extend `StandardProps`.

   **Runtime backstop for `{...rest}` spreading**:

   ```ts
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const { icon, className, classes: _classes, ...rest } = props
   ```

   `Omit` removes from the TYPE; the destructure prevents runtime leakage if `props` was spread from an untyped source. Defense in depth.

   **No `<Component>-diff.json`** for components in the "drop public classes" path — there was no real API change to document (the prop was already broken or vestigial).

   **Reference**: PR #4947 (Button) for canonical shape. See `packages/base/Button/src/Button/Button.tsx` + `ButtonBase.tsx`.

   ### Forbidden patterns

   - Don't add `withClasses` helper from `@toptal/picasso-utils` — deprecated since 2026-05-11.
   - Don't add `*ClassKey` slot-key types or `Partial<Record<*ClassKey, string>>` declarations.
   - Don't drop a locally narrowed `classes?: { ... }` API on a component where consumers depend on it (FormControlLabel in Tier 1, Dropdown / OutlinedInput in Tier 3 — even if you only see Tier 0/1 in your scope, the principle applies).
   - Don't generate `<Component>-diff.json` for a "we dropped classes" change if there was no real API change (vestigial → drop is type-level only).

   **Long-term direction**: once all 28 components migrate, `StandardProps`, `JssProps`, `Classes` are removed from `@toptal/picasso-shared`. Dropdown + OutlinedInput permanently retain their locally narrowed `classes?: { ... }` surface.

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
