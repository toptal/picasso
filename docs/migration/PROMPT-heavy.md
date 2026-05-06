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
   - Add @base-ui/react if used.
   - Add @toptal/picasso-tailwind-merge (peer) and
     @toptal/picasso-tailwind (peer) if not already present.

5. Do NOT change:
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

**Mandatory before exit:** run `yarn davinci-syntax lint code packages/base/<NAME>/src` (auto-fix mode, no `--check`) once, then `yarn davinci-syntax lint code --check packages/base/<NAME>/src` to verify zero errors. The orchestrator's outer-loop gate runs the same scoped command — if you exit before lint passes, the gate fails identically and you've wasted an iteration. **Do not** weaken public types (e.g. fall back to `any`) just to placate a lint warning. Use the call-site cast pattern (`as ComponentName.Props['key']`) instead, per `rules/api-preservation.md`.

---

## Changelog

- **v1** — Lifted verbatim from migration plan v3 §5.3 (May 2026 re-audit). Replaces the v1 PROMPT.md (archived under [`archive/PROMPT-v1-deprecated.md`](./archive/PROMPT-v1-deprecated.md)) which incorrectly named `@mui/base` as the target.
