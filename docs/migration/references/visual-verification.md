# Visual verification — baseline vs local Storybook comparison

The Playwright-based runtime + visual workflow run during every migration with `--with-mcp` active (default for Tier 0/2/3). Pixel-perfect parity between the deployed baseline and your local edits is the only acceptable outcome for the migrated component.

## Two complementary visual tools

| Tool | Strength | Use it for |
|---|---|---|
| **Playwright MCP** (this doc) | Fast feedback, interactive (hover/click/focus/keyboard), surfaces console errors + accessibility tree + runtime warnings | Live iteration during development. Catch obvious regressions FAST before the slower Happo cycle. |
| **Happo** (see `references/happo-iteration.md`) | Authoritative pixel-diff against persisted baselines, designer-approval workflow, parallel browser/viewport coverage, CI-gating | Final regression authority. Even if Playwright says "looks fine to me", Happo is the source of truth — must be green (or all diffs marked intentional with operator approval). |

Playwright is the **fast iteration tool** during your loop. Happo is the **authoritative gate**. Use Playwright continuously; use Happo to confirm at the end of each iteration.

## Reference Storybooks

- **Baseline** — `https://picasso.toptal.net/` — Picasso's deployed Storybook from master. Always-on, represents the pre-migration look. Use this as your reference image.
- **Local** — `http://localhost:9001/` — Storybook running inside your worktree, auto-started by the orchestrator after `pnpm install` and BEFORE your session began. Reflects your edits in real-time as you save files. If port 9001 was taken, fallback port is in `migration-runs/<run-date>/<Component>/storybook-url.txt` — read it first.

## Story URLs follow `components-<name>--<name>-<story>`

The component name is **repeated** after `--`. Examples:

- Slider, "Range" story → `components-slider--slider-range`
- Slider, "Tooltip" story → `components-slider--slider-tooltip`
- Backdrop, "Invisible" story → `components-backdrop--backdrop-invisible`
- Button, "Default" story → `components-button--button-default`

Story-name suffixes come from the `addExample` titles in `packages/base/<Component>/src/<Component>/story/index.jsx` (kebab-cased). Do NOT use `components-slider--range` — the repeated name segment is mandatory. To list a component's stories without trial-and-error, read its `story/index.jsx`.

## Playwright MCP tools

- `mcp__playwright__browser_navigate` — load story URLs.
- `mcp__playwright__browser_take_screenshot` — pixel-level confirmation.
- `mcp__playwright__browser_console_messages` — runtime warnings + errors.
- `mcp__playwright__browser_hover` / `browser_click` — exercise interaction states.

## Mandatory runtime check (required when `--with-mcp` is active)

1. **Navigate to the story.** Use the correct repeated-name URL form.
2. **Render the actual component, not just the trigger.** Many stories show only a trigger button (e.g. Backdrop's default story shows an "Open Backdrop" button — the backdrop itself is hidden until clicked). After `browser_navigate`, look at the snapshot: if you only see a placeholder button or instruction text, you have NOT verified the migrated component. `browser_click` the trigger, then re-screenshot. The thing you're migrating must be on screen before you call the check done.
3. **`browser_console_messages` and confirm zero `[error]` entries.** React 18's `ReactDOM.render` deprecation warning is acceptable for now (Picasso-wide); any other error is a fail — investigate and fix before exiting. Capture console BOTH on initial render AND after every interaction — many errors only fire on user-triggered mount.
4. **Use judgment on which interactions to exercise.** Don't run a script — think about what would prove the migration works:
   - **Backdrop**: open + close (verify mount/unmount), and the `Invisible` variant.
   - **Button**: hover, focus, click, plus disabled state if separate.
   - **Modal**: open, close via backdrop click, close via Escape, scroll inside.
   - **Switch**: default + hover + focused + checked.
   - **Tooltip**: default trigger + opened tooltip + arrow position.
   The bar is "would a reasonable reviewer think I actually verified this works", not "I clicked one button".
5. **`browser_take_screenshot` per meaningful state.**

## Baseline-vs-local comparison workflow

For each story:

1. `browser_navigate` to the baseline URL on `picasso.toptal.net` → `browser_take_screenshot` → save to `migration-runs/<run-date>/<Component>/playwright/baseline--<story-id>.png`.
2. `browser_navigate` to the same story on `http://localhost:9001` → `browser_take_screenshot` → save to `migration-runs/<run-date>/<Component>/playwright/local--<story-id>.png`.
3. Use vision to compare the two images side-by-side. Look for layout shifts, color differences, missing/extra elements, font/spacing changes.
4. Repeat for each meaningful interaction state. Save as `local--<story-id>--<state>.png` and `baseline--<story-id>--<state>.png`.

Storage: all screenshots under `migration-runs/<run-date>/<Component>/playwright/`. The `migration-runs/` directory is gitignored — never committed.

## Pixel-perfect is the only acceptable outcome

Picasso is a UI kit. Consumers depend on byte-identical rendering across releases. A migration's job is to swap the underlying library while keeping output pixel-identical. **Any visual delta on the migrated component is a REGRESSION you must fix in source**, not an "intentional consequence of the new DOM".

INTENTIONAL deltas are allowed **only** when an "Approved visual deltas" section in `docs/migration/components/<Component>.md` enumerates the specific delta. Self-declared "intentional" calls are misclassifications — see `references/happo-iteration.md` §"INTENTIONAL is effectively forbidden".

## Read the `@base-ui/react` source BEFORE adding CSS compensation

When you see a positional shift on a migrated compound part (Slider thumb, Tooltip popup, Dropdown popper, etc.), the first move is to read the library's source for the affected slot:

```
node_modules/@base-ui/react/<group>/<part>/<Part>.js
```

For example: `slider/thumb/SliderThumb.js`, `tooltip/popup/TooltipPopup.js`. Look for inline-style assignments inside `useMemo` / `getStyle` / render. The library may already provide centering / positioning / sizing via the modern CSS Transforms 2 `translate:` / `rotate:` / `scale:` properties — these compose with Tailwind's `transform: translate(...)` (CSS `transform` property is independent of `translate` property). If you add `-translate-x-1/2 -translate-y-1/2` on top of a library-provided `translate: -50% -50%`, the element is doubly-shifted → real regression.

### jsdom does NOT serialize modern CSS Transforms 2 properties

jsdom (jest test env) does NOT serialize the `translate:` / `rotate:` / `scale:` CSS properties into the `style=""` attribute. So a Jest snapshot showing `style="position: absolute; inset-inline-start: X%; top: 50%"` (no translate) does NOT prove the library doesn't center — Chrome (Happo / Playwright) renders it differently. Use either:
- (a) the library source itself, or
- (b) the Playwright/picasso.toptal.net screenshot comparison,

NEVER the Jest snapshot alone, as your basis for "what positioning the library applies".

### Picasso's snapshot serializer quirk

Picasso's `jss-snapshot-serializer.cjs` mis-classifies multi-dash Tailwind utilities (`-translate-x-1/2`, `bg-blue-500`, anything matching `X-Y-Z` with Z = digits) as JSS class names and strips the suffix in stored snapshots. So `class="... -translate-x"` in a snapshot file may correspond to `-translate-x-1/2` in source. If you update a snapshot after editing classes, check the actual SOURCE className string in `<Component>.tsx`, NOT just what shows in the snapshot.

## Worked compensation examples

### Focus outline shift

**Symptom**: baseline shows a 2px focus ring on the trigger button; local shows a 1px ring (or none).

**Diagnosis**: `@base-ui/react` swapped `:focus-visible` semantics for the `[data-focused]` attribute. The component's old Tailwind `focus-visible:outline-2` rule no longer applies.

**Fix**: mirror old `:focus-visible` styles via the new selector:

```tsx
<BaseUIButton
  className="data-[focused]:outline-2 data-[focused]:outline-offset-2 data-[focused]:outline-blue-500"
  // (was: "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500")
/>
```

### Hover background-color delta

**Symptom**: baseline hover bg is darker than local.

**Diagnosis**: the JSS rule used `lighten(theme.palette.primary.main, 0.15)`; the migration translated to `hover:bg-blue-400` (the next-lighter palette step), losing 1 token.

**Fix**: either correct the Tailwind token to match the JSS-computed shade, OR keep the literal with a `// TODO(tokens):` comment if no canonical token exists:

```tsx
// Old: hover background = lighten(primary.main, 0.15) ≈ #4269D6
className="hover:bg-[#4269D6]"  // TODO(tokens): map to canonical token when added
```

### Wrapper-element geometry drift

**Symptom**: baseline and local have the same content, but local sits 4px lower/right.

**Diagnosis**: `@base-ui/react` injected a wrapper element (e.g. `Drawer.Popup` wraps content that previously sat at root level).

**Fix**: adjust `gap`, `p-*`, or `m-*` on the new wrapper so geometry stays identical to the old DOM:

```tsx
<Drawer.Popup className="-m-1 p-1">{children}</Drawer.Popup>
// Negative outer margin compensates the new wrapper's intrinsic border.
```

## Exit criterion

**Pixel-perfect match** between baseline (`picasso.toptal.net`) and local (`localhost:9001`) for every story + variant + interaction state of the migrated component.

The ONLY exception: deltas explicitly listed under "Approved visual deltas" in `docs/migration/components/<Component>.md` (operator-authored). If that section doesn't exist or the delta isn't listed, it's a regression — fix it.

Skipping this is exiting with an unverified migration. The orchestrator's gate does NOT catch runtime-only errors — Happo only compares pixel diffs against a baseline, which passes if a runtime exception causes an empty render with no baseline yet, or if the visual is unchanged but a console error fires.
