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

## The production font is domain-locked — localhost renders Arial, not proxima-nova

proxima-nova loads from a domain-locked Adobe Typekit kit (`use.typekit.net/rlr4crj.css`) that only serves on `*.toptal.net`. So **`picasso.toptal.net` (baseline) renders the real font, but `localhost:9001` (your worktree) falls back to Arial.** Two consequences you MUST account for:

- Font-metric differences (`line-height`, `letter-spacing`, glyph widths) render differently between your two reference Storybooks for reasons that have nothing to do with your diff — don't chase those.
- More importantly: a **real** font-metric regression in your migration (e.g. a dropped `line-height` pin) will **NOT reproduce on localhost** (Arial masks it), yet it IS present in Happo's cloud render (real font). So **"I couldn't reproduce it locally" is never grounds to call a Happo diff environmental, flaky, or unfixable** (see `references/happo-iteration.md`). When a Happo `dimension_mismatch` won't repro locally, stop comparing rendered boxes and diff the SOURCE styles instead — old `createStyles` / `PicassoProvider.override` vs your new Tailwind.

## DO NOT use the deployed PR preview for verification

`https://toptal.github.io/picasso/prs/<pr-number>/` is the GitHub Pages deployment of the PR's Storybook bundle — useful for human reviewers to click around, but **wrong for your visual verification**:

- It lags behind your in-progress edits by however long the last CI Pages job took (often minutes, sometimes never if Pages deploy didn't run for this commit).
- It serves the bundle Webpack built for that commit, not the live worktree.

Observed agent failure (Switch sweep, 2026-05-22): the agent navigated to `https://toptal.github.io/picasso/prs/4965/iframe.html?id=components-switch--switch-controlled` (a story id that doesn't exist on any Picasso Storybook), hit Storybook's error overlay, and proceeded as if visual verification had happened. It hadn't. Evidence is the console log at `<worktree>/.playwright-mcp/console-2026-05-22T16-01-59-729Z.log`. See §"Story URLs" for the real id format.

**Hard rule.** Your two and only two allowed hostnames for `browser_navigate` are:

1. `http://localhost:9001` (or the port in `storybook-url.txt`) — for `local--*` screenshots.
2. `https://picasso.toptal.net` — for `baseline--*` screenshots.

If you find yourself about to navigate to `toptal.github.io/picasso/prs/...`, STOP. That's the deployed preview, not the in-progress code. Re-target to `localhost:9001`.

## Story URLs — ONE story per component page

Picasso's HUMAN-mode Storybook (which both `picasso.toptal.net` and `pnpm start:storybook` serve) registers exactly **one story per component page**. Every example you see on the page (Default, Range, Hover, Disabled, etc.) is rendered as an in-page chapter within that single story — they are NOT separate Storybook stories with their own ids.

The id format is **`<section>-<name>--<name>`** — section prefix and component name, separated by `--`, with the name repeated. The section prefix comes from the `PicassoBook.section('X')` call in `packages/.../<Component>/story/index.jsx`:

- `Components/` → `components-`
- `Forms/` → `forms-`
- `Layout/` → `layout-`
- `Overlays/` → `overlays-`
- `Picasso Forms/` → `picasso-forms-`
- `Picasso Charts/` → `picasso-charts-`

Worked examples (verified against picasso.toptal.net 2026-05-25):

| Component | `section('X')` | createPage | Story ID |
|---|---|---|---|
| Slider | `Components` | `Slider` | `components-slider--slider` |
| Switch | `Forms` | `Switch` | `forms-switch--switch` |
| Backdrop | `Components` | `Backdrop` | `components-backdrop--backdrop` |
| Button | `Components` | `Button` | `components-button--button` |
| Tabs | `Layout` | `Tabs` | `layout-tabs--tabs` |
| Tooltip | `Overlays` | `Tooltip` | `overlays-tooltip--tooltip` |
| PageTopBar | `Components` | `PageTopBar` | `components-pagetopbar--pagetopbar` |
| AvatarUpload | `Forms` | `AvatarUpload` | `forms-avatarupload--avatarupload` |

Slug rule: lowercase the kind segment and replace any non-`[a-z0-9-]` with `-` (Storybook's `@storybook/csf` sanitizer). Multi-word CamelCase names (`PageTopBar`, `AvatarUpload`) become one lowercase word with no internal hyphens — `pagetopbar`, not `page-top-bar`.

### Wrong patterns to avoid

These all produce `.sb-show-errordisplay` overlays — they don't exist:

- ❌ `components-slider--slider-range` (no per-example ids on staging)
- ❌ `components-slider--slider-default`, `components-slider--slider-tooltip`, etc.
- ❌ `forms-switch--controlled`, `forms-switch--switch-controlled`
- ❌ `components-backdrop--backdrop-default`, `components-backdrop--backdrop-invisible`

The two prior observed agent failures (Switch sweep 2026-05-22; Slider-v2 review-iter 1, 2026-05-24) both came from agents constructing per-example ids that don't exist on staging.

### Pre-resolved URLs in the iter prompt

When `--with-mcp` is active, the orchestrator runs a one-shot Playwright probe at startup against BOTH `localhost:<port>` and `picasso.toptal.net`, enumerating `__STORYBOOK_CLIENT_API__.raw()` and pinning the canonical URL for the migrating component. The result is injected into your iter-1 prompt as a `# Story manifest for <Component>` section near the top — use those URLs verbatim. No need to enumerate yourself.

### Live enumeration fallback

If the manifest section is absent (Storybook didn't boot in time, probe timed out), enumerate via `browser_evaluate` on a known-good URL:

```js
// browser_navigate first to ANY existing iframe URL, e.g.:
//   http://localhost:9001/iframe.html?id=components-button--button
// (Button exists on every Picasso build, so this never 404s).
// Then browser_evaluate this:
const stories = window.__STORYBOOK_CLIENT_API__?.raw?.() ?? [];
JSON.stringify(
  stories
    .filter(s => /\b<componentNameLower>\b/i.test(s.kind || ''))
    .map(s => ({ id: s.id, kind: s.kind, name: s.name })),
  null, 0)
```

Replace `<componentNameLower>` with the migration target (e.g. `slider`). The returned `id` is the exact string to pass as `?id=<id>` on `iframe.html`.

> **Note**: Picasso ships Storybook **6.5**, not 7+. `__STORYBOOK_CLIENT_API__.raw()` is the correct surface. `__STORYBOOK_PREVIEW__.storyStoreValue` and `/index.json` are Storybook 7+ — they return `undefined` / 404 here. The two older patterns documented in earlier versions of this file are obsolete.

## Playwright MCP tools

- `mcp__playwright__browser_navigate` — load story URLs.
- `mcp__playwright__browser_take_screenshot` — pixel-level confirmation.
- `mcp__playwright__browser_console_messages` — runtime warnings + errors.
- `mcp__playwright__browser_hover` / `browser_click` — exercise interaction states.

## Mandatory runtime check (required when `--with-mcp` is active)

1. **Navigate to the story using the canonical URL pattern.** Exactly one URL shape is canonical:

   ```
   http://localhost:9001/iframe.html?id=<story-id>&viewMode=story
   ```

   - `iframe.html` (NOT `/?path=/story/...`) renders ONLY the story canvas — no Storybook chrome, no sidebar, no addons panel. That's what Happo screenshots; it's what you should screenshot too.
   - `&viewMode=story` suppresses the docs tab when a story has both. Without it, some stories load the MDX docs page by default and `browser_take_screenshot` captures prose instead of the component.
   - Use the port from `storybook-url.txt` if `:9001` is taken — `cat <runDir>/storybook-url.txt` to confirm.
   - For the baseline comparison, the same shape works on `https://picasso.toptal.net/iframe.html?id=<story-id>&viewMode=story`.

   See §"Story URLs — ONE story per component page" above. If a `# Story manifest for <Component>` section is present in your iteration prompt (orchestrator auto-resolves it for `--with-mcp` runs), use those URLs verbatim — they're already verified against both staging and localhost.

1a. **Confirm the navigation actually landed on a real story** (NOT a 404 overlay). Storybook 6 returns HTTP 200 with an `.sb-show-errordisplay` overlay when the id is invalid — there is no network-level signal. Run this check AFTER every `browser_navigate` and BEFORE `browser_take_screenshot`:

   ```
   mcp__playwright__browser_evaluate { function: "() => ({
     errorOverlay: document.body.classList.contains('sb-show-errordisplay'),
     title: document.title,
     rootChildren: (document.getElementById('storybook-root') || document.getElementById('root'))?.children?.length ?? 0
   })" }
   ```

   A real story render gives `errorOverlay: false`, `title: '<section>-<name>--<name>'`, `rootChildren: 1` or more. A 404 gives `errorOverlay: true`, `title: 'Webpack App'`, `rootChildren: 0`.

   If you got the overlay, STOP. The url is wrong — re-read the Story manifest section or re-enumerate via `__STORYBOOK_CLIENT_API__.raw()`. Do NOT proceed to `browser_take_screenshot`. PR #4946 review-iter 1 (Slider-v2, 2026-05-24) committed three `baseline--components-slider--slider-*.png` files into the worktree root that were all overlay screenshots, because the agent skipped this check — reviewer caught them and the fix was a forced `git rm`.

1b. **Wait for the story to actually render before screenshotting.** `browser_navigate` returns when the document loads, but Storybook needs additional time to mount the story component. Do NOT use blind `setTimeout` — it wastes wall clock and is flaky on slow stories. Two reliable approaches:

   ```
   # Preferred — wait for a known element/text in the story body
   mcp__playwright__browser_wait_for { text: "Switch label", time: 10 }
   ```

   ```
   # Fallback — programmatically poll for Storybook 6's render-complete state
   mcp__playwright__browser_evaluate { function: "async () => {
     for (let i = 0; i < 50; i++) {
       const api = window.__STORYBOOK_CLIENT_API__
       const root = document.getElementById('storybook-root') || document.getElementById('root')
       if (api?.raw && root && root.children.length > 0) return true
       await new Promise(r => setTimeout(r, 100))
     }
     return false
   }" }
   ```

   Both have a 5–10s implicit cap, beat blind sleeps, and produce a deterministic signal you can branch on. Observed on Switch sweep 2026-05-22: agent escalated through `setTimeout(r, 2000)` → `5000` → `15000` blind sleeps while the iframe was already ready — that's wasted iters + tokens. Use the explicit checks instead.

2. **Render the actual component, not just the trigger.** Many stories show only a trigger button (e.g. Backdrop's default story shows an "Open Backdrop" button — the backdrop itself is hidden until clicked). After `browser_navigate`, look at the snapshot: if you only see a placeholder button or instruction text, you have NOT verified the migrated component. `browser_click` the trigger, then re-screenshot. The thing you're migrating must be on screen before you call the check done.
3. **`browser_console_messages` and confirm zero `[error]` entries.** React 18's `ReactDOM.render` deprecation warning is acceptable for now (Picasso-wide); any other error is a fail — investigate and fix before exiting. Capture console BOTH on initial render AND after every interaction — many errors only fire on user-triggered mount.
4. **Use judgment on which interactions to exercise.** Don't run a script — think about what would prove the migration works:
   - **Backdrop**: open + close (verify mount/unmount), and the `Invisible` variant.
   - **Button**: hover, focus, click, plus disabled state if separate.
   - **Modal**: open, close via backdrop click, close via Escape, scroll inside.
   - **Switch**: default + hover + focused + checked.
   - **Tooltip**: default trigger + opened tooltip + arrow position.
   The bar is "would a reasonable reviewer think I actually verified this works", not "I clicked one button".
5. **`browser_take_screenshot` per meaningful state — ALWAYS pass `filename`.** See §"Screenshot persistence" below.

## Screenshot persistence — pass `filename` on every call

The Playwright MCP is configured (`bin/lib/agent-mcp-config.json`) with `--output-dir ../playwright`. Since your cwd is the worktree, the MCP resolves that to `<runDir>/playwright/` (sibling of the worktree, which the orchestrator pre-creates). Screenshots saved there persist beyond worktree cleanup and are visible to the operator + the next sweep tick.

**You MUST pass a `filename` parameter on every `browser_take_screenshot` call.** Without it, the MCP returns the image in-message and never writes to disk — the screenshot is lost the moment your turn ends, and the operator has no record of what you actually saw. (Observed on Switch review-iter 7, 2026-05-22: 16 Playwright calls, zero PNGs persisted, so any "I verified visually" claim was unverifiable.)

Naming convention (kebab-case, no spaces, no leading slash):

- `local--<story-id>.png` — screenshot of `http://localhost:9001` for that story, default state.
- `baseline--<story-id>.png` — screenshot of `https://picasso.toptal.net` for the same story.
- `local--<story-id>--<state>.png` / `baseline--<story-id>--<state>.png` — for interaction states (hover, focused, checked, opened, etc.).
- `iter<N>-local--<story-id>.png` if you want to keep iter-by-iter history within one sweep tick (useful when iterating on a single Happo diff). Not required, just allowed.

The filename is RELATIVE to the MCP's output-dir — pass just `local--components-button--button.png`, NOT `migration-runs/.../playwright/local--...png`. The MCP resolves the relative path internally.

Example call:

```
mcp__playwright__browser_take_screenshot { filename: "local--forms-switch--controlled--hover.png" }
```

If you omit `filename`, the MCP saves to `page-{timestamp}.{png}` as a fallback — usable but harder to correlate with stories. Always pass an explicit filename.

## Baseline-vs-local comparison workflow

For each story:

1. `browser_navigate` to the baseline URL on `picasso.toptal.net` → `browser_take_screenshot { filename: "baseline--<story-id>.png" }`.
2. `browser_navigate` to the same story on `http://localhost:9001` → `browser_take_screenshot { filename: "local--<story-id>.png" }`.
3. Use vision (the MCP returns the image alongside saving) to compare the two side-by-side. Look for layout shifts, color differences, missing/extra elements, font/spacing changes.
4. Repeat for each meaningful interaction state with the `--<state>` suffix in the filename.

Storage: all screenshots end up under `migration-runs/<run-date>/<Component>/playwright/` via the MCP's `--output-dir` config. The `migration-runs/` directory is gitignored — never committed.

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
