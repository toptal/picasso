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
   - **After editing any package.json deps, run `pnpm install --config.link-workspace-packages=false` from
     the repo root and stage `pnpm-lock.yaml` in the same commit.** Missing
     lockfile update is the single most common reason CI's "Build packages"
     step fails on dep-bumping migrations. The `--config.link-workspace-packages=false`
     flag is **mandatory**: without it, pnpm honors the repo's `.npmrc`
     setting (`link-workspace-packages=true`) and cascade-rewrites dozens
     of workspace dep entries from npm-fetched specs to `link:packages/<X>`.
     That cascade exposes latent type errors in downstream packages
     (e.g. `BreadcrumbsItem.tsx` TS2322 on `OverridableComponent<Props>`)
     and breaks the orchestrator's `pnpm happo` gate. CI is unaffected
     because it always uses `--frozen-lockfile`. If it's hundreds of
     `link:packages/` substitutions in the diff, you forgot the flag;
     reset with `git checkout HEAD -- pnpm-lock.yaml` and re-run with
     the flag. If a runtime dep used at compile time is added (e.g.
     `withClasses` consuming `@toptal/picasso-tailwind-merge`), the
     package needs it as a `devDependency` for its own `tsc -b` resolution,
     not just as a `peerDependency` — peerDeps are only seen by *consumers*
     of the package, not by the package's own build.

5. **The `classes` prop — research your component, then act (revised 2026-05-11).**

   Cross-tier audit (`docs/migration/decisions/classes-audit.md`) ran 2026-05-11. The audit is your **starting hypothesis**, not a script — Tier 2/3 components have richer slot vocabularies and more potential edge cases than Tier 0/1. Verify per-component before editing.

   ### Audit hypothesis for Tier 2 + Tier 3 (your starting context)

   - **Tier 2** (Checkbox, Radio, Tooltip, FileInput, Popper): all extend `StandardProps` (open-ended `classes` inherited). Internal usage is **plumbing-only** (component-to-MUI bridges that disappear with @base-ui/react). External real consumer usage: **0** across all 5.
   - **Tier 3.a** (Accordion, Page): open-ended `StandardProps`. Internal: Accordion has 3 self-callsites (root/summary/content/details to MUI/sub-components); Page sub-components pass to Dropdown/Accordion. External real: 0.
   - **Tier 3.b** (Dropdown, OutlinedInput): **locally narrowed `classes?: { ... }`** in the public Props (Dropdown: `{ popper?, content? }`; OutlinedInput: `{ input?, root? }`). The narrowed prop IS read in the body (Dropdown lines 282 + 317; OutlinedInput lines 178 + 185). External real usage CONFIRMED: Dropdown 2 callsites (`content` + `popper`); OutlinedInput 4 callsites (`input` × 3, `root` × 2).

   ### Required research steps — perform BEFORE editing

   1. **Read the public `Props` interface** in the component's main `.tsx` (and `types.ts` if separate):
      - Does it `extends StandardProps`? (Open-ended `classes` inherited.)
      - Does it declare LOCAL `classes?: { ... }`? (Narrowed surface — KEEP.)
      - Both? Local declaration shadows the inherited one.

   2. **Read `styles.ts`** for the JSS slot vocabulary. `createStyles({ root: {...}, summary: {...}, ... })` keys are the historical slot keys.

   3. **Grep the component body** for `classes.` / `classes?.` / `externalClasses?.` access. Each access site is a slot that's actually consumed.

   4. **Multiline rg internal callsites** that pass `<Component classes={{...}}>`:
      ```bash
      rg --multiline --multiline-dotall -U \
        '<<Name>\b[^>]*?\bclasses\s*=\s*\{\{' \
        -g '*.tsx' -g '*.ts' packages/
      ```

   5. **Cross-reference with audit** (`docs/migration/decisions/classes-audit.md` §4 + §5 + §6). Confirm your row matches. If it doesn't — stop and update the audit.

   6. **(For narrowed Tier 3.b components — Dropdown, OutlinedInput)** Sanity-check external real usage with a fresh gh search before deciding:
      ```bash
      gh search code '<Dropdown classes={{ -repo:toptal/picasso' --owner toptal --limit 30 --json textMatches
      ```
      Manually inspect each `textMatches[].fragment` to confirm `classes=` is on the target component, not coincidence. Audit's count was 2 — if you find materially more, escalate (this changes the migration shape).

   ### Decision matrix (apply based on YOUR findings)

   | Your finding | Action |
   |---|---|
   | Extends `StandardProps` only, body reads `classes` for slots that disappear under @base-ui/react (e.g. consumed by MUI v4 wrapper being replaced), audit says 0 external | **Drop public `classes`** via `extends Omit<StandardProps, 'classes'>` + destructure `classes: _classes` runtime backstop. Rewrite internal slot-routing during the @base-ui/react migration — slots map to part-level `className`. No diff JSON. Note in PR description. |
   | Extends `StandardProps` only, body doesn't read `classes`, vestigial | Drop public `classes` via `Omit`. Internal plumbing already empty. |
   | Locally narrowed `classes?: { slotA, slotB }`, body reads them, audit shows external real usage (Dropdown, OutlinedInput) | **KEEP narrowed surface unchanged.** Port slot routing: each narrowed slot maps to an @base-ui/react part's `className`. E.g. `classes?.popper` → `<Popover.Positioner className={cx(base, classes?.popper)}>`. |
   | Sub-components (AccordionSummary, AccordionDetails, FileList, ProgressBar) that extend StandardProps but their `classes` is plumbing-only | Drop via `Omit` on sub-component too. Rewrite internal use during migration. |
   | Audit contradicts source state (e.g. audit says narrowed but it's actually open-ended) | STOP. Update `classes-audit.md`. Don't proceed. |
   | Fresh gh search finds NEW external real usage that wasn't in the 2026-05-11 audit | STOP. Update audit §3/§4/§5 with new finding. If the new external usage targets a slot you were planning to drop, escalate — drop becomes a breaking change. |

   ### Reference patterns

   **A. Drop public `classes` via `Omit`** (Tier 0, Tier 1 vestigial, Tier 2, Tier 3.a):

   ```ts
   export interface Props
     extends Omit<StandardProps, 'classes'>,
             /* other extensions */ {
     // ... your props ...
     // NO `classes?` declaration. Don't add one back.
   }

   const Component = forwardRef<HTMLDivElement, Props>(function Component(props, ref) {
     const {
       /* ... your destructured props ... */
       // eslint-disable-next-line @typescript-eslint/no-unused-vars
       classes: _classes,    // runtime backstop
       ...rest
     } = props
     // ...
   })
   ```

   **B. Preserve narrowed `classes` surface** (Tier 3.b — Dropdown, OutlinedInput):

   ```ts
   export interface Props
     extends Omit<StandardProps, 'classes'>,    // drop open-ended
             /* other extensions */ {
     // ... your props ...
     /** Override per-slot Tailwind classes */
     classes?: { popper?: string; content?: string }   // ← keep the same narrowed shape
   }

   const Component = forwardRef<HTMLDivElement, Props>(function Component(props, ref) {
     const { classes, ...rest } = props
     return (
       <Popover.Positioner className={twMerge(baseClasses.popper, classes?.popper)}>
         <Popover.Popup className={twMerge(baseClasses.content, classes?.content)}>
           {/* ... */}
         </Popover.Popup>
       </Popover.Positioner>
     )
   })
   ```

   Note for **B**: also `Omit<StandardProps, 'classes'>` to drop the open-ended inherited type, then re-add the narrowed declaration. This way TypeScript narrows correctly — consumers passing `classes={{ wrong: '...' }}` get an error.

   ### Forbidden patterns

   - Don't add `withClasses` helper from `@toptal/picasso-utils` — deprecated.
   - Don't add `*ClassKey` slot-key types or `Partial<Record<*ClassKey, string>>` declarations — also deprecated. Use the literal slot keys inline.
   - Don't drop Dropdown's `{ popper, content }` or OutlinedInput's `{ input, root }` — they have confirmed external consumers.
   - Don't generate `<Component>-diff.json` for a "we dropped classes" change when the prop was already vestigial. If you ARE narrowing a previously-open-ended type to a tighter one with real impact (rare), generate the diff JSON.

   **Long-term direction**: once all 28 components migrate, `StandardProps`, `JssProps`, `Classes` are removed from `@toptal/picasso-shared`. Dropdown + OutlinedInput retain their locally narrowed `classes?: { ... }` permanently.

6. Do NOT change:
   - test.tsx assertions
   - story files
   - file locations or export names

Output: file edits only. No explanations.

### Acceptance criteria — iterate to working, then run full

You have Bash access for **verification only** (`pnpm typecheck`, `pnpm --filter:*`, `pnpm davinci-qa:*`, `pnpm lint:*`, `pnpm cypress:*`, `pnpm happo:*`, `pnpm info:*`, `npm view:*`, `git diff/status/log/show/blame`). Use it to self-verify between edits — don't wait for the orchestrator's outer-loop gate.

For the fastest inner-loop feedback on lint, scope to the migrating package's src instead of running repo-wide:

```bash
pnpm davinci-syntax lint code --check packages/base/<NAME>/src
# Auto-fix on the same scope:
pnpm davinci-syntax lint code packages/base/<NAME>/src
```

This is ~12x faster than `pnpm lint` (which lints the whole repo). Use the scoped form for iterative fixing; the orchestrator's outer-loop gate runs the same scoped command for its lint stage.

If `--with-mcp` was passed to the orchestrator (default for Tier 0/2/3), you also have **Playwright MCP** tools and a Storybook server running at `http://localhost:9001`. **Runtime verification is required** — `pnpm typecheck` and the gate stages catch type/build errors but miss the class of bugs that fire only at render time: React 18/19 console warnings, `ReactDOM.render` deprecations, Base UI's `nativeButton` warning, broken `ref` forwarding, hydration mismatches, and components that throw silently and render blank (which Happo passes as "small diff"). The runtime check catches these before commit.

Available tools:
- `mcp__playwright__browser_navigate` to load story URLs (e.g. `http://localhost:9001/?path=/story/components-button--default`).
- `mcp__playwright__browser_take_screenshot` for pixel-level confirmation.
- `mcp__playwright__browser_console_messages` to capture runtime warnings + errors.
- `mcp__playwright__browser_hover` / `browser_click` to exercise interaction states.

**Mandatory runtime check (required when `--with-mcp` is active — non-optional):**

1. **Discover the story URLs.** `browser_navigate` to `http://localhost:9001/` and read the left sidebar to find your component's stories under `Components / <Name>`. URL pattern is `http://localhost:9001/?path=/story/components-<lowercase-name>--<story-id>` but the `<story-id>` part is **per-component** — for Backdrop it's `--backdrop` (default) + `--invisible` (variant), not `--default`. Inspect the story tree by reading `mcp__playwright__browser_snapshot` of the sidebar or just navigating into `Components` group to enumerate them.

2. **Render the actual component, not just the trigger.** Many stories show only a trigger button (e.g. Backdrop's default story shows an "Open Backdrop" button — the backdrop itself is hidden until clicked). After `browser_navigate`, look at the screenshot/snapshot: if you only see a placeholder button or instruction text, you have NOT verified the migrated component yet. `browser_click` the trigger (or whatever action makes the component visible), then re-screenshot. The thing you're migrating must be on screen before you call this check done.

3. **`browser_console_messages` and confirm zero `[error]` entries.** React 18's `ReactDOM.render` deprecation warning is acceptable for now (Picasso-wide); any other error is a fail — investigate and fix before exiting. Capture console BOTH on initial render AND after every interaction (click/hover/focus) — many errors only fire when the component mounts in response to user action.

4. **Use judgment on which interactions to exercise.** Don't run a script — think about what would prove the migration works. For Backdrop: open + close (verify mount/unmount), and the `Invisible` variant. For Button: hover, focus, click, plus disabled state if it's a separate story. For Modal: open, close via backdrop click, close via Escape, scroll inside. For Dropdown: open via click, navigate options via arrow keys, close via Escape and via outside-click. The bar is "would a reasonable reviewer think I actually verified this works", not "I clicked one button". Tier 2/3 components with richer slot vocabularies generally need more interaction coverage than Tier 0/1.

5. `browser_take_screenshot` once per meaningful state (default trigger view, component-open view, key variants). These are sanity checks, not the gate — Happo handles pixel-perfect comparison. You're confirming the component renders and reacts; not that pixels are identical.

Skipping this is exiting with an unverified migration. The orchestrator's gate does NOT catch runtime-only errors — Happo only compares pixel diffs against a baseline, which passes if a runtime exception causes an empty render with no baseline yet, or if the visual is unchanged but a console error fires. And **viewing only the trigger button** is the most common false-positive: the migrated component never rendered, console was clean, but you verified nothing.

**Working acceptance** (run for regular feedback during iteration):
- `pnpm --filter @toptal/picasso-<NAME> build:package` passes (types + emit)
- `pnpm davinci-qa unit --testPathPattern packages/base/<NAME>` passes
- `pnpm davinci-syntax lint code --check packages/base/<NAME>/src` passes (zero errors)
- (when `--with-mcp`) all stories render cleanly with zero `[error]` console messages across default + interactive states

**Full acceptance** (run before declaring done):
- working acceptance passes
- `pnpm typecheck` passes (full repo)
- (when `--with-mcp`) mandatory runtime check above completed
- (if applicable) cypress component spec passes
- Happo report green or designer-approved diffs only

**Mandatory before exit:** run `pnpm davinci-syntax lint code packages/base/<NAME>/src` (auto-fix mode, no `--check`) once, then `pnpm davinci-syntax lint code --check packages/base/<NAME>/src` to verify zero errors. The orchestrator's outer-loop gate runs the same scoped command — if you exit before lint passes, the gate fails identically and you've wasted an iteration. **Do not** weaken public types (e.g. fall back to `any`) just to placate a lint warning. Use the **boundary-cast** pattern (`as ComponentName.Props['key']`) hoisted into a helper return type or local typed binding instead — see `rules/base-ui-react-api-crib.md` §"Type alignment at the boundary". Avoid sprinkling inline casts at the JSX call site; reviewers will ask you to consolidate them.

---

## Changelog

- **v1** — Lifted verbatim from migration plan v3 §5.3 (May 2026 re-audit). Replaces the v1 PROMPT.md (archived under [`archive/PROMPT-v1-deprecated.md`](./archive/PROMPT-v1-deprecated.md)) which incorrectly named `@mui/base` as the target.
