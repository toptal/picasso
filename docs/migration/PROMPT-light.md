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
   - Add @base-ui/react.

3. Preserve the public prop surface. When @base-ui/react's types narrow
   vs Picasso's wider public types (e.g. polymorphic components where
   Picasso accepts MouseEvent<HTMLButtonElement & HTMLAnchorElement>
   but @base-ui/react accepts MouseEvent<HTMLButtonElement>), do NOT
   change the public type. Cast at the call site instead:
       onClick={handler as BaseUIButton.Props['onClick']}
       ref={ref as React.Ref<HTMLElement>}
   The `as ComponentName.Props['<key>']` indexed-type-access pattern is
   the canonical narrow-cast for @base-ui/react. NEVER fall back to
   `any` — that violates api-preservation.md and triggers lint errors.

   If a prop genuinely must change (a public type that cannot be
   preserved even with casting), add it to
   docs/migration/<Component>-diff.json with codemod=required.

4. Tailwind class composition (cx/twMerge usage) stays as-is — that
   was the win of the @mui/base era. Don't rewrite styles.

5. Do NOT change:
   - test.tsx assertions (snapshots OK to regenerate)
   - story files (they exercise the public API)
   - file locations or export names

Output: file edits only. No explanations.

### Acceptance criteria — iterate to working, then run full

You have Bash access for **verification only** (`yarn typecheck`, `yarn workspace:*`, `yarn davinci-qa:*`, `yarn lint:*`, `git diff/status/log`). Use it to self-verify between edits — don't wait for the orchestrator's outer-loop gate.

If `--with-mcp` was passed to the orchestrator, you also have **Playwright MCP** tools and a Storybook server running at `http://localhost:9001`. Use them to verify visual + runtime behavior:

- `mcp__playwright__browser_navigate` to load story URLs (e.g. `http://localhost:9001/?path=/story/components-button--default`).
- `mcp__playwright__browser_screenshot` for pixel-level inspection.
- `mcp__playwright__browser_console_logs` to catch runtime warnings (e.g. Base UI's `nativeButton` warning).
- `mcp__playwright__browser_hover` / `browser_click` to exercise interaction states (default / hover / focused / disabled).

Inspect at minimum the default + hover + focused + disabled stories. If `console.error` fires during render, the migration is wrong even if the gate passes.

**Working acceptance** (run for regular feedback during iteration):
- `yarn workspace @toptal/picasso-<NAME> build:package` passes
- `yarn davinci-qa unit --testPathPattern packages/base/<NAME>` passes
- (if Storybook + Playwright MCP available) story renders cleanly: default + hover + focused + disabled states without `console.error`

**Full acceptance** (run before declaring done):
- working acceptance passes
- `yarn typecheck` passes
- `yarn lint` passes (entire repo)
- (if applicable) cypress component spec passes
- Happo report green or designer-approved diffs only

Iterate freely against working acceptance. Lint warnings during iteration are normal; clean them up as a final pass — **do not** weaken public types (e.g. fall back to `any`) just to placate a lint warning. Use the call-site cast pattern (`as ComponentName.Props['key']`) instead, per `rules/api-preservation.md`.

---

## Changelog

- **v1** — Lifted verbatim from migration plan v3 §5.2 (May 2026 re-audit). Replaces the v1 PROMPT.md (archived under [`archive/PROMPT-v1-deprecated.md`](./archive/PROMPT-v1-deprecated.md)) which incorrectly named `@mui/base` as the target.
