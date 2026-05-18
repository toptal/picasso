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
   - **After editing any package.json deps, run plain `pnpm install` from
     the repo root and stage `pnpm-lock.yaml` in the same commit.** Trust
     Picasso's `pnpm-workspace.yaml` configuration as-is. **DO NOT pass
     `--config.link-workspace-packages=false`** (or any other workspace-link
     override). Earlier versions of this prompt mandated that flag; the
     mandate has been REVOKED as of 2026-05-13. Picasso intentionally uses
     `linkWorkspacePackages: true` so the lockfile represents workspace
     deps as compact `link:packages/X` references — overriding that flag
     forces pnpm to rewrite every workspace package entry to expanded
     peer-suffix form, producing ~7,500 extra lines of unrelated lockfile
     diff and triggering spurious changeset-bot complaints on transitively
     touched packages.
   - **Expect a typical migration's `pnpm-lock.yaml` diff to be < 300 lines**
     for a single-component dep change. If the diff is > 1000 lines OR you
     see `link:packages/X` lines being REPLACED with expanded peer-suffix
     form, the workspace-link representation has been broken — reset with
     `git checkout origin/<base-branch> -- pnpm-lock.yaml && pnpm install`
     (plain — NO flag) and try again.
   - Missing lockfile update is a common reason CI's "Build packages" step
     fails on dep-bumping migrations. Validate before commit: `git status`
     shows `pnpm-lock.yaml` modified IFF you touched `dependencies` /
     `devDependencies` / `peerDependencies`. If deps changed but the lockfile
     didn't, verify the new dep is already in the lockfile (`grep '@base-ui/react' pnpm-lock.yaml`).
   - If a runtime dep used at compile time is added (e.g. `withClasses`
     consuming `@toptal/picasso-tailwind-merge`), the package needs it as
     a `devDependency` for its own `tsc -b` resolution, not just as a
     `peerDependency` — peerDeps are only seen by *consumers* of the
     package, not by the package's own build.

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

   **Snapshot regeneration precondition (mandatory, since 2026-05-18 Modal incident):** Before running `pnpm davinci-qa unit -u` on ANY consumer package's snapshots, verify the MIGRATING package builds cleanly:

   ```bash
   pnpm --filter @toptal/picasso-<name> build:package
   ```

   Why: the orchestrator's bootstrap runs `pnpm build:package` across all workspaces; if any package fails (e.g. mid-migration source breaks the workspace's transitive builds), bootstrap logs `continuing anyway (consumers stage may fail)` and continues with stale dist artifacts. Consumer tests then import a stale or broken `@toptal/picasso-<name>` and jsdom renders an empty body, so `jest -u` writes a 1-line minimal snap. CI later runs with a fresh build and renders 120+ lines — the committed snap is wrong. Modal PR #4967 was discarded specifically because of this failure mode (PromptModal snap captured `<div class="Picasso-root" />` only, CI then diffed `-1 / +120` lines). Always confirm the build is clean for the migrating package BEFORE accepting any regenerated consumer snapshot.

7. **Author a changeset (mandatory).** Create `.changeset/<component-kebab>-migration.md` at the repo root before declaring done. The file accumulates on `feature/picasso-modernization`; the final `pnpm changeset version` at release time aggregates all per-PR files into a per-package CHANGELOG.

   Template:

   ```markdown
   ---
   '<workspace-package-name>': <versionBump from manifest>
   ---

   ### <ComponentName>

   - <one-line present-simple description of what changed>
   - <additional bullets if applicable>
   ```

   Rules:
   - **Read the `versionBump` value from `docs/migration/manifest.json`** for this component. Do NOT pick your own — the level is locked per-component using the rules in [`docs/contribution/changeset-guidelines.md`](../contribution/changeset-guidelines.md) against the per-tier classes-audit decision matrix. If you think the manifest's value is wrong, stop and escalate; don't override.
   - **Workspace package name** = the migrating package's `package.json` `name` field. Heavy-path migrations frequently touch multiple packages (sibling packages picasso-charts / picasso-query-builder / picasso-rich-text-editor migrate clusters of internal components; Tier 5 picasso-provider sweeps ~50 transitive consumers). Add one frontmatter line per affected package with its own versionBump if more than one is touched in the same PR.
   - **Present simple tense.** "Rewrite Checkbox onto @base-ui/react/checkbox", not "Rewrote…" / "Rewriting…".
   - **Body content** describes user-observable changes. Examples:
     - Tier 1 cleanup-only (Note, Form, FormLayout, ModalContext, Menu, Utils, FormLabel, Grid):
       ```markdown
       ### Note

       - Drop the @material-ui/core peer-dependency (no longer required at runtime)
       - Lift the React 19 peerDependency upper bound
       ```
     - Tier 1 vestigial classes drop (Container, Typography, Notification):
       ```markdown
       ### Typography

       - Drop the @material-ui/core peer-dependency and lift the React 19 cap
       - Drop the inherited `classes` prop from public types (was vestigial; see docs/migration/decisions/classes-audit.md)
       ```
     - Tier 2 / Tier 3.a heavy rewrites (Checkbox, Radio, Tooltip, FileInput, Popper, Accordion, Page):
       ```markdown
       ### Tooltip

       - Rewrite internals onto @base-ui/react/tooltip + Tailwind (no public API change)
       - Drop the inherited `classes` prop from public types (internal slot vocabulary moved to per-part `className`)
       - Drop @material-ui/core peer-dep and JSS dependencies
       ```
     - Tier 3.b that keep narrowed `classes` (Dropdown, OutlinedInput):
       ```markdown
       ### Dropdown

       - Rewrite internals onto @base-ui/react/menu + @base-ui/react/popover with Tailwind
       - `classes?: { popper, content }` slot routing preserved (existing API surface unchanged)
       - Replace @material-ui/core/Grow transition with CSS data-starting-style / data-ending-style
       ```
   - **Filename** is kebab-case: `note-migration.md`, `outlined-input-migration.md`, `picasso-rich-text-editor-migration.md`. Avoid timestamps or PR numbers.
   - Format is enforced by lint-staged (prettier runs on `.changeset/*.md`); no need to hand-format.

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
- `mcp__playwright__browser_navigate` to load story URLs. **Picasso story IDs use the pattern `components-<name>--<name>-<story>` — the component name REPEATS after `--`**. Examples: `components-slider--slider-range`, `components-slider--slider-tooltip`, `components-button--button-default`, `components-backdrop--backdrop-invisible`. Do NOT use `components-slider--range` or `components-button--default` — those produce "Couldn't find story matching" errors.
- `mcp__playwright__browser_take_screenshot` for pixel-level confirmation.
- `mcp__playwright__browser_console_messages` to capture runtime warnings + errors.
- `mcp__playwright__browser_hover` / `browser_click` to exercise interaction states.

**Mandatory runtime check (required when `--with-mcp` is active — non-optional):**

1. **Story URLs follow `components-<name>--<name>-<story>`** — the component name is repeated after `--`. Examples:
   - Slider, "Range" story → `http://localhost:9001/?path=/story/components-slider--slider-range`
   - Slider, "Tooltip" story → `http://localhost:9001/?path=/story/components-slider--slider-tooltip`
   - Backdrop, "Invisible" story → `http://localhost:9001/?path=/story/components-backdrop--backdrop-invisible`
   Story-name suffixes come from the `addExample` titles in `packages/base/<Component>/src/<Component>/story/index.jsx` (kebab-cased). Do NOT use `components-slider--range` — the repeated name segment is mandatory.

2. **Render the actual component, not just the trigger.** Many stories show only a trigger button (e.g. Backdrop's default story shows an "Open Backdrop" button — the backdrop itself is hidden until clicked). After `browser_navigate`, look at the screenshot/snapshot: if you only see a placeholder button or instruction text, you have NOT verified the migrated component yet. `browser_click` the trigger (or whatever action makes the component visible), then re-screenshot. The thing you're migrating must be on screen before you call this check done.

3. **`browser_console_messages` and confirm zero `[error]` entries.** React 18's `ReactDOM.render` deprecation warning is acceptable for now (Picasso-wide); any other error is a fail — investigate and fix before exiting. Capture console BOTH on initial render AND after every interaction (click/hover/focus) — many errors only fire when the component mounts in response to user action.

4. **Use judgment on which interactions to exercise.** Don't run a script — think about what would prove the migration works. For Backdrop: open + close (verify mount/unmount), and the `Invisible` variant. For Button: hover, focus, click, plus disabled state if it's a separate story. For Modal: open, close via backdrop click, close via Escape, scroll inside. For Dropdown: open via click, navigate options via arrow keys, close via Escape and via outside-click. The bar is "would a reasonable reviewer think I actually verified this works", not "I clicked one button". Tier 2/3 components with richer slot vocabularies generally need more interaction coverage than Tier 0/1.

5. `browser_take_screenshot` per meaningful state — see the dedicated **Visual verification** section below for the full PoC-style baseline-vs-local comparison workflow.

Skipping this is exiting with an unverified migration. The orchestrator's gate does NOT catch runtime-only errors — Happo only compares pixel diffs against a baseline, which passes if a runtime exception causes an empty render with no baseline yet, or if the visual is unchanged but a console error fires. And **viewing only the trigger button** is the most common false-positive: the migrated component never rendered, console was clean, but you verified nothing.

### Visual verification — baseline vs local Storybook comparison (PoC pattern, revised 2026-05-13)

**Two complementary visual tools — different roles, different strengths:**

| Tool | Strength | Use it for |
|---|---|---|
| **Playwright MCP** (this section) | Fast feedback, interactive (hover/click/focus/keyboard), compares MORE than just pixels (console errors, accessibility tree, runtime warnings) | Live iteration during development. Catch obvious regressions FAST before the slower Happo cycle. Especially valuable for Tier 2/3 with stateful interactions (Tooltip open/close, Dropdown keyboard nav, Accordion expand). |
| **Happo** (next section) | Authoritative pixel-diff against persisted baselines, designer-approval workflow, parallel browser/viewport coverage, CI-gating | Final regression authority. Even if Playwright says "looks fine to me", Happo is the source of truth — must be green (or all diffs marked intentional). |

Playwright is the **fast iteration tool** during your loop. Happo is the **authoritative gate**. Use Playwright continuously; use Happo to confirm at the end of each iteration.

**Goal: pixel-perfect parity between the deployed baseline and your local edits for ALL stories, ALL variants, ALL interaction states.**

You have TWO reference Storybooks:

- **Baseline** — `https://picasso.toptal.net/` — Picasso's deployed Storybook from master. Always-on, represents the pre-migration look. Use this as your reference image.
- **Local** — `http://localhost:9001/` — Storybook running INSIDE your worktree, auto-started by the orchestrator after `pnpm install` and BEFORE your session began. Reflects your edits in real-time as you save files. If port 9001 was taken, fallback port is in `migration-runs/<run-date>/<Component>/storybook-url.txt` — read it first to get the actual URL.

#### Workflow

1. **Enumerate stories**: URL pattern is `?path=/story/components-<name>--<name>-<story>` (component name REPEATED — see top of "Runtime check" section above). The deployed `picasso.toptal.net` and local `localhost:9001` use identical IDs (same Storybook source). To list a component's stories without trial-and-error, read `packages/base/<Component>/src/<Component>/story/index.jsx` — each `addExample(..., '<Title>', ...)` title becomes the kebab-cased story suffix.

2. **For each story, capture and compare**:
   - `browser_navigate` to the baseline URL on `picasso.toptal.net` → `browser_take_screenshot` → save to `migration-runs/<run-date>/<Component>/playwright/baseline--<story-id>.png`
   - `browser_navigate` to the same story on `http://localhost:9001` → `browser_take_screenshot` → save to `migration-runs/<run-date>/<Component>/playwright/local--<story-id>.png`
   - Use your vision capability to compare the two images side-by-side. Look for layout shifts, color differences, missing/extra elements, font/spacing changes.

3. **For each story, exercise interaction states**: default, hover, clicked, focused (where applicable). Tier 2/3 components with richer slot vocabularies need MORE state coverage than Tier 0/1. Examples:
   - Tooltip: default trigger + hover-opened + arrow position + click-opened + escape-close
   - Dropdown: closed trigger + opened menu + hover-on-item + keyboard-navigate (ArrowDown) + selected + escape-close
   - Accordion: collapsed + expanded + expanded-with-content + multi-item interactions
   - Use `browser_hover` / `browser_click` / `browser_press_key` between captures. Save as `local--<story-id>--<state>.png` (and `baseline--<story-id>--<state>.png` for matching baseline state).

4. **For each diff identified during comparison — pixel-perfect is the only acceptable outcome**:

   **Picasso is a UI kit.** Consumers depend on byte-identical rendering across releases. A migration's job is to swap the underlying library while keeping output pixel-identical. **Any visual delta on the migrated component is a REGRESSION you must fix in source**, not "the new library's way."

   **CRITICAL — before adding CSS/Tailwind compensation, Read the @base-ui/react source for the compound part you're working with.** Look at `node_modules/@base-ui/react/<group>/<part>/<Part>.js` (e.g. `tooltip/popup/TooltipPopup.js`, `slider/thumb/SliderThumb.js`) for inline-style assignments inside `useMemo` / `getStyle` / render. The library may already provide centering / positioning / sizing via the modern CSS Transforms 2 `translate:` / `rotate:` / `scale:` properties — these compose with Tailwind's `transform: translate(...)`. Adding redundant Tailwind translates on top of library-provided `translate: -50% -50%` causes double-shifting → real regression. Tier 2/3 work has heavier slot composition (e.g. Tooltip's Positioner + Popup + Arrow chain) where each library part may apply its own positioning logic — Read ALL of them before compensating.

   **jsdom (jest test env) does NOT serialize the `translate:` / `rotate:` / `scale:` CSS properties** into the `style=""` attribute. So a Jest snapshot showing `style="position: absolute; ..."` (no translate) does NOT prove the library doesn't center — Chrome (Happo) renders it differently. Use either: (a) the library source itself, or (b) the Playwright/picasso.toptal.net screenshot comparison, NEVER the Jest snapshot alone, as your basis for "what positioning the library applies."

   **Also: Picasso's `jss-snapshot-serializer.cjs`** mis-classifies multi-dash Tailwind utilities (`-translate-x-1/2`, `bg-blue-500`, anything matching `X-Y-Z` with Z = digits) as JSS class names and strips the suffix in stored snapshots. Check the actual SOURCE className string after edits, not just what shows in the stored snapshot file.

   - **REGRESSION** (default for any delta on the migrated component): edit Tailwind / CSS / overrides in your worktree until local matches baseline byte-for-byte. Hot-reload, re-capture, re-compare. Iterate. Tier 2/3 work involves heavier slot rewrites — that doesn't relax the pixel-perfect bar; it raises the compensation work. Common fixes:
     - `@base-ui/react` slot composition (e.g. `<Tooltip.Popup>` vs MUI's `<MUITooltip>`) emits different DOM. Mirror the prior visual via Tailwind on the new slot (`Tooltip.Popup` styled to match old wrapper geometry).
     - `data-state="open"` selectors replace `:hover` / `:focus-visible` — add `data-[state=open]:` Tailwind rules that replicate the old transition.
     - Arrow / popper positioning differs from MUI's model → set explicit `offset` props on the `Positioner` until pixel-aligned.
     - Class-name churn (`base-X` prefix dropped) → if anything visually depends on the old class, restore the rule via Tailwind under a new selector.

   - **INTENTIONAL** is **effectively forbidden** during a refactor migration. Only valid when the operator pre-approved a design-led change for this migration and documented it in `docs/migration/components/<X>.md` under an **"Approved visual deltas"** heading. Self-declared "intentional" calls have produced wrong outcomes — they're regressions in disguise. If you're tempted to use this bucket: stop, treat as regression, find the CSS compensation.

5. **Storage**: all screenshots under `migration-runs/<run-date>/<Component>/playwright/`. The `migration-runs/` directory is gitignored — these are local debug artifacts, never committed.

#### Exit criterion for visual verification

**Pixel-perfect match** between baseline (`picasso.toptal.net`) and local (`localhost:9001`) for every story + variant + interaction state of the migrated component.

The ONLY exception: deltas explicitly listed under "Approved visual deltas" in `docs/migration/components/<Component>.md` (operator-authored). If that section doesn't exist or the delta isn't listed, it's a regression — fix it.

Anything else means iterate.

### Happo iteration (Part 4, 2026-05-13)

The gate runs `pnpm happo --only <Component>` after Playwright verification. This is the authoritative visual regression check — Happo screenshots upload to https://happo.io and diff against master's baseline.

**Happo is now mandatory locally** — the gate fails if `HAPPO_API_KEY` / `HAPPO_API_SECRET` aren't set in your env. If you see "HAPPO_API_KEY unset" in the gate log, STOP and ask the operator to set them up (see `ORCHESTRATOR.md` §Happo setup).

If Happo reports diffs:

1. **The orchestrator pre-downloads each diff pair's old/new PNG** under `migration-runs/<run-date>/<Component>/happo-diffs/<idx>-<check-slug>/<idx>-<component>-<variant>-<target>.{old,new}.png`. `Read` each PNG via the multimodal Read tool — that's the authoritative source. The Happo report URL (`https://happo.io/a/<account>/p/<project>/compare/<sha1>/<sha2>`) is a fallback.
2. **Classify per the strict matrix in §Visual verification** above: REGRESSION on migrated component → fix in source (Tailwind compensation, data-attr selectors, slot-level overrides); UNRELATED FLAKE on a different component → PR comment with pixel evidence; INTENTIONAL → only if pre-approved in plan file. Tier 2/3 work does NOT relax the pixel-perfect requirement — heavier slot rewrites mean more compensation work, not lower bar.
3. **Iterate to zero**. For every regression: identify the visual delta pixel-by-pixel, find the source cause, edit, re-run gate. Pixel-perfect on the migrated component is the bar.
4. **Goal: Happo report green with zero migrated-component diffs**. Iterate until Happo passes locally OR every remaining diff is on an unrelated component (designer accepts those in Happo UI).

The orchestrator's classifier feeds Happo failures back to you as `feed-to-agent` triggers (NOT immediate escalations). You share the migrate-loop's `--max-iterations` budget; stuck-detection (same diff set across 2 consecutive iters) escalates to designer naturally.

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
