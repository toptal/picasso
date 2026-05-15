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
     for a single-component dep change. Common patterns:
     `+ '@base-ui/react': link:...` and `- '@mui/base': ...` plus a few
     transitive resolution changes. If the diff is > 1000 lines OR you see
     `link:packages/X` lines being REPLACED with expanded peer-suffix form,
     the workspace-link representation has been broken — reset with
     `git checkout origin/<base-branch> -- pnpm-lock.yaml && pnpm install`
     (plain — NO flag) and try again.
   - Missing lockfile update is a common reason CI's "Build packages" step
     fails on dep-bumping migrations. Validate before commit: `git status`
     shows `pnpm-lock.yaml` modified IFF you touched any `dependencies` /
     `devDependencies` / `peerDependencies`. If deps changed but the lockfile
     didn't, the resolution didn't move — verify the new dep is already in
     the lockfile (`grep '@base-ui/react' pnpm-lock.yaml`).

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
   - **Workspace package name** = the migrating package's `package.json` `name` field. For Tier 0 cleanup that drops a public typed prop (`classes`), no other package is affected — single frontmatter line. If the migration also edits a sibling package (rare in Tier 0), add a second frontmatter line with that package's own versionBump.
   - **Present simple tense.** "Migrate Button internals to @base-ui/react", not "Migrated…" / "Migrating…".
   - **Body content** describes user-observable changes. For Tier 0 light-path migrations the canonical body is:
     ```markdown
     ### Button

     - Migrate internals from @mui/base to @base-ui/react (behavioral parity)
     - Drop the inherited `classes` prop from public types (was vestigial since the @mui/base step — see docs/migration/decisions/classes-audit.md)
     ```
     Adjust per component — e.g. omit the `classes` bullet for components that don't drop it.
   - **Filename** is kebab-case: `button-migration.md`, `outlined-input-migration.md`. Avoid timestamps or PR numbers.
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
- `mcp__playwright__browser_navigate` to load story URLs (e.g. `http://localhost:9001/?path=/story/components-button--default`).
- `mcp__playwright__browser_take_screenshot` for pixel-level confirmation.
- `mcp__playwright__browser_console_messages` to capture runtime warnings + errors.
- `mcp__playwright__browser_hover` / `browser_click` to exercise interaction states.

**Mandatory runtime check (required when `--with-mcp` is active — non-optional):**

1. **Discover the story URLs.** `browser_navigate` to `http://localhost:9001/` and read the left sidebar to find your component's stories under `Components / <Name>`. URL pattern is `http://localhost:9001/?path=/story/components-<lowercase-name>--<story-id>` but the `<story-id>` part is **per-component** — for Backdrop it's `--backdrop` (default) + `--invisible` (variant), not `--default`. Inspect the story tree by reading `mcp__playwright__browser_snapshot` of the sidebar or just navigating into `Components` group to enumerate them.

2. **Render the actual component, not just the trigger.** Many stories show only a trigger button (e.g. Backdrop's default story shows an "Open Backdrop" button — the backdrop itself is hidden until clicked). After `browser_navigate`, look at the screenshot/snapshot: if you only see a placeholder button or instruction text, you have NOT verified the migrated component yet. `browser_click` the trigger (or whatever action makes the component visible), then re-screenshot. The thing you're migrating must be on screen before you call this check done.

3. **`browser_console_messages` and confirm zero `[error]` entries.** React 18's `ReactDOM.render` deprecation warning is acceptable for now (Picasso-wide); any other error is a fail — investigate and fix before exiting. Capture console BOTH on initial render AND after every interaction (click/hover/focus) — many errors only fire when the component mounts in response to user action.

4. **Use judgment on which interactions to exercise.** Don't run a script — think about what would prove the migration works. For Backdrop: open + close (verify mount/unmount), and the `Invisible` variant. For Button: hover, focus, click, plus disabled state if it's a separate story. For Modal: open, close via backdrop click, close via Escape, scroll inside. The bar is "would a reasonable reviewer think I actually verified this works", not "I clicked one button".

5. `browser_take_screenshot` per meaningful state — see the dedicated **Visual verification** section below for the full PoC-style baseline-vs-local comparison workflow.

Skipping this is exiting with an unverified migration. The orchestrator's gate does NOT catch runtime-only errors — Happo only compares pixel diffs against a baseline, which passes if a runtime exception causes an empty render with no baseline yet, or if the visual is unchanged but a console error fires. And **viewing only the trigger button** is the most common false-positive: the migrated component never rendered, console was clean, but you verified nothing.

### Visual verification — baseline vs local Storybook comparison (PoC pattern, revised 2026-05-13)

**Two complementary visual tools — different roles, different strengths:**

| Tool | Strength | Use it for |
|---|---|---|
| **Playwright MCP** (this section) | Fast feedback, interactive (hover/click/focus/keyboard), compares MORE than just pixels (console errors, accessibility tree, runtime warnings) | Live iteration during development. Catch obvious regressions FAST before the slower Happo cycle. |
| **Happo** (next section) | Authoritative pixel-diff against persisted baselines, designer-approval workflow, parallel browser/viewport coverage, CI-gating | Final regression authority. Even if Playwright says "looks fine to me", Happo is the source of truth — must be green (or all diffs marked intentional). |

Playwright is the **fast iteration tool** during your loop. Happo is the **authoritative gate**. Use Playwright continuously; use Happo to confirm at the end of each iteration.

**Goal: pixel-perfect parity between the deployed baseline and your local edits for ALL stories, ALL variants, ALL interaction states.**

You have TWO reference Storybooks:

- **Baseline** — `https://picasso.toptal.net/` — Picasso's deployed Storybook from master. Always-on, represents the pre-migration look. Use this as your reference image.
- **Local** — `http://localhost:9001/` — Storybook running INSIDE your worktree, auto-started by the orchestrator after `pnpm install` and BEFORE your session began. Reflects your edits in real-time as you save files. If port 9001 was taken, fallback port is in `migration-runs/<run-date>/<Component>/storybook-url.txt` — read it first to get the actual URL.

#### Workflow

1. **Enumerate stories**: `browser_navigate` to `https://picasso.toptal.net/`. Click your component in the left sidebar under `Components / <Name>`. Record each story's URL pattern (typically `?path=/story/components-<lowercase>--<story-id>`). The deployed Storybook's story IDs MATCH the local ones (same Storybook source).

2. **For each story, capture and compare**:
   - `browser_navigate` to the baseline URL on `picasso.toptal.net` → `browser_take_screenshot` → save to `migration-runs/<run-date>/<Component>/playwright/baseline--<story-id>.png`
   - `browser_navigate` to the same story on `http://localhost:9001` → `browser_take_screenshot` → save to `migration-runs/<run-date>/<Component>/playwright/local--<story-id>.png`
   - Use your vision capability to compare the two images side-by-side. Look for layout shifts, color differences, missing/extra elements, font/spacing changes.

3. **For each story, exercise interaction states**: default, hover, clicked, focused (where applicable to the component). For Switch: default + hover + focused + checked. For Tooltip: default trigger + opened tooltip + arrow position. For Modal: closed + opened + Escape-close. Use `browser_hover` / `browser_click` between captures.
   - Save interaction-state shots as `local--<story-id>--<state>.png` (e.g. `local--default--hover.png`). Baseline interactive states: navigate baseline + repeat hover/click; save as `baseline--<story-id>--<state>.png`.

4. **For each diff identified during comparison — pixel-perfect is the only acceptable outcome**:

   **Picasso is a UI kit.** Consumers depend on byte-identical rendering across releases. A migration's job is to swap the underlying library while keeping output pixel-identical. **Any visual delta on the migrated component is a REGRESSION you must fix in source**, not an "intentional consequence of the new DOM."

   **CRITICAL — before adding CSS/Tailwind compensation, Read the @base-ui/react source for the compound part you're working with.** Look at `node_modules/@base-ui/react/<group>/<part>/<Part>.js` (e.g. `slider/thumb/SliderThumb.js`, `tooltip/popup/TooltipPopup.js`) for inline-style assignments inside `useMemo` / `getStyle` / render. The library may already provide centering / positioning / sizing via the modern CSS Transforms 2 `translate:` / `rotate:` / `scale:` properties — these compose with Tailwind's `transform: translate(...)` (CSS `transform` property is independent of `translate` property). If you add `-translate-x-1/2 -translate-y-1/2` on top of a library-provided `translate: -50% -50%`, the element is doubly-shifted → real regression.

   **jsdom (jest test env) does NOT serialize the `translate:` / `rotate:` / `scale:` CSS properties** into the `style=""` attribute. So a Jest snapshot showing `style="position: absolute; inset-inline-start: X%; top: 50%"` (no translate) does NOT prove the library doesn't center — Chrome (Happo) renders it differently. Use either: (a) the library source itself, or (b) the Playwright/picasso.toptal.net screenshot comparison, NEVER the Jest snapshot alone, as your basis for "what positioning the library applies."

   **Also: Picasso's `jss-snapshot-serializer.cjs`** mis-classifies multi-dash Tailwind utilities (`-translate-x-1/2`, `bg-blue-500`, anything matching `X-Y-Z` with Z = digits) as JSS class names and strips the suffix in stored snapshots. So `class="... -translate-x"` in a snapshot file may correspond to `-translate-x-1/2` in source. If you update a snapshot after editing classes, check the actual SOURCE className string in `Slider.tsx` etc., NOT just what shows in the snapshot.

   - **REGRESSION** (default for any delta on the migrated component): edit Tailwind / CSS / overrides in your worktree until the local screenshot matches the baseline byte-for-byte. Hot-reload, re-capture, re-compare. Iterate. Common compensations:
     - New `data-*` attribute changes specificity → add a `[data-attr]:` Tailwind selector replicating the old appearance.
     - `@base-ui/react` adds inline styles (e.g. `style="transform: translateX(...)"`) → either match via Tailwind utilities or override with `style={{ transform: ... }}` to keep the prior visual.
     - Dropped/added wrapper element shifts margins → adjust `gap`/`p-*`/`m-*` so the rendered geometry stays the same.
     - Focus outline differs → mirror old `:focus-visible` styles via `data-[focused]:outline-*` or analogous selector.

   - **INTENTIONAL** is **effectively forbidden** during a refactor migration. Only valid when the operator pre-approved a design-led change for this migration and documented it in `docs/migration/components/<X>.md` under an **"Approved visual deltas"** heading. Self-declared "intentional" calls (e.g. "Base UI's `data-disabled` attribute, accept it") have produced wrong outcomes (Slider PR #4955: 8 diffs labeled intentional for DOM-shape reasons — wrong; those needed CSS compensation). If you're tempted to use this bucket: stop, treat as regression, and fix.

5. **Storage**: all screenshots under `migration-runs/<run-date>/<Component>/playwright/`. The `migration-runs/` directory is gitignored — these are local debug artifacts, never committed. The operator can scroll through them post-iteration to verify your work.

#### Exit criterion for visual verification

**Pixel-perfect match** between baseline (`picasso.toptal.net`) and local (`localhost:9001`) for every story + variant + interaction state of the migrated component.

The ONLY exception: deltas explicitly listed under "Approved visual deltas" in `docs/migration/components/<Component>.md` (operator-authored). If that section doesn't exist or the delta isn't listed, it's a regression — fix it.

Anything else means iterate.

### Happo iteration (Part 4, 2026-05-13)

The gate runs `pnpm happo --only <Component>` after Playwright verification. This is the authoritative visual regression check — Happo screenshots get uploaded to https://happo.io and diffed against master's baseline.

**Happo is now mandatory locally** — the gate fails if `HAPPO_API_KEY` / `HAPPO_API_SECRET` aren't set in your env. If you see "HAPPO_API_KEY unset" in the gate log, STOP and ask the operator to set them up (see `ORCHESTRATOR.md` §Happo setup).

If Happo reports diffs:

1. **The orchestrator pre-downloads each diff pair's old/new PNG** under `migration-runs/<run-date>/<Component>/happo-diffs/<idx>-<check-slug>/<idx>-<component>-<variant>-<target>.{old,new}.png`. `Read` each PNG via the multimodal Read tool — that's the authoritative source. The Happo report URL (`https://happo.io/a/<account>/p/<project>/compare/<sha1>/<sha2>`) is a fallback if pre-fetch failed.
2. **Classify per the strict matrix in §Visual verification** above: REGRESSION on migrated component → fix; UNRELATED FLAKE on a different component → PR comment with pixel evidence; INTENTIONAL → only if pre-approved in plan file.
3. **Iterate to zero**. For every regression: identify the visual delta from pixel comparison, find the source cause (Tailwind class missing, data-attr selector needed, library default to override), edit, re-run gate. Pixel-perfect is the bar.
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

**Mandatory before exit:** run `pnpm davinci-syntax lint code packages/base/<NAME>/src` (auto-fix mode, no `--check`) once, then `pnpm davinci-syntax lint code --check packages/base/<NAME>/src` to verify zero errors. The orchestrator's outer-loop gate runs the same scoped command — if you exit before lint passes, the gate fails identically and you've wasted an iteration. **Do not** weaken public types (e.g. fall back to `any`) just to placate a lint warning. Use the call-site cast pattern (`as ComponentName.Props['key']`) instead, per `rules/api-preservation.md`.

---

## Changelog

- **v1** — Lifted verbatim from migration plan v3 §5.2 (May 2026 re-audit). Replaces the v1 PROMPT.md (archived under [`archive/PROMPT-v1-deprecated.md`](./archive/PROMPT-v1-deprecated.md)) which incorrectly named `@mui/base` as the target.
