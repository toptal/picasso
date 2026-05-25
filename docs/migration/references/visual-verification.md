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

## DO NOT use the deployed PR preview for verification

`https://toptal.github.io/picasso/prs/<pr-number>/` is the GitHub Pages deployment of the PR's Storybook bundle — useful for human reviewers to click around, but **wrong for your visual verification**:

- It lags behind your in-progress edits by however long the last CI Pages job took (often minutes, sometimes never if Pages deploy didn't run for this commit).
- It serves the bundle Webpack built for that commit, not the live worktree.
- It does NOT serve Storybook's `/index.json` / `/stories.json` endpoints (404), breaking the enumeration approach below.

Observed agent failure (Switch sweep, 2026-05-22): the agent navigated to `https://toptal.github.io/picasso/prs/4965/iframe.html?id=components-switch--switch-controlled`, hit a 404, and proceeded as if visual verification had happened. It hadn't. Evidence is the console log at `<worktree>/.playwright-mcp/console-2026-05-22T16-01-59-729Z.log`.

**Hard rule.** Your two and only two allowed hostnames for `browser_navigate` are:

1. `http://localhost:9001` (or the port in `storybook-url.txt`) — for `local--*` screenshots.
2. `https://picasso.toptal.net` — for `baseline--*` screenshots.

If you find yourself about to navigate to `toptal.github.io/picasso/prs/...`, STOP. That's the deployed preview, not the in-progress code. Re-target to `localhost:9001`.

## Story URLs — ENUMERATE, do not guess

Story IDs are NOT always `components-<name>--<name>-<story>`. The section prefix depends on which PicassoBook section the page belongs to:

- Button uses `PicassoBook.section('Components')` → IDs start with `components-`
- Switch uses `PicassoBook.section('Forms')` → IDs start with `forms-`
- Other sections (`Layout`, `Typography`, `Pickers`, etc.) follow the same rule with their own prefix

Guessing the prefix fails — observed agent failure (Switch sweep, 2026-05-22): constructed `components-switch--switch-controlled` and hit a 404 "Couldn't find story matching". Actual ID was `forms-switch--controlled`.

**Bulletproof approach — fetch the live story index from Storybook itself.** When `--with-mcp` is active, Storybook is running on `localhost:9001` (or the port in `migration-runs/<run-date>/<Component>/storybook-url.txt`). Hit its index endpoint via Bash, then filter:

```bash
# Modern Storybook (7+) — preferred
curl -s http://localhost:9001/index.json | jq -r '.entries | to_entries[] | select(.value.title | test("Switch"; "i")) | "\(.key)\t\(.value.title)\t\(.value.name)"'

# Legacy Storybook (older 6.x) — fallback if /index.json 404s
curl -s http://localhost:9001/stories.json | jq -r '.stories | to_entries[] | select(.value.kind | test("Switch"; "i")) | "\(.key)\t\(.value.kind)\t\(.value.name)"'
```

The first column is the exact story ID — copy-paste it into `?id=<id>` on `iframe.html`. No guessing, no trial-and-error.

**Fallback if the index endpoint is unreachable**: read `packages/base/<Component>/src/<Component>/story/index.jsx` to find both:
- The `.section('<Section>')` value — kebab-cased, this is the URL prefix (`Forms` → `forms-`).
- The `.createPage('<Page>', ...)` value — kebab-cased, this is the kind suffix.
- The `addExample(<file>, '<title>', ...)` or `addExample(<file>, { title: '<title>' }, ...)` calls — each title (kebab-cased) is one story name.

Picasso's slug convention: `<section>-<page>--<page>-<story>` — the page name IS repeated after `--` in most stories, but not always (Switch's example titles do not include the page name in the title field, so the story ID is `forms-switch--controlled`, NOT `forms-switch--switch-controlled`). When in doubt, fall back to the index endpoint above.

Worked examples (verified via /index.json):

- Button, "Default" story (kind: `Components/Button`) → `components-button--button-default`
- Slider, "Range" story (kind: `Components/Slider`) → `components-slider--slider-range`
- Backdrop, "Invisible" story (kind: `Components/Backdrop`) → `components-backdrop--backdrop-invisible`
- Switch, "Controlled" story (kind: `Forms/Switch`) → `forms-switch--controlled`
- Switch, "Uncontrolled" story → `forms-switch--uncontrolled`
- Switch, "Disabled" story → `forms-switch--disabled`

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

   See §"Story URLs — ENUMERATE, do not guess" above for getting `<story-id>` from Storybook's index endpoint. If a Story manifest section is present in your iteration prompt, use those URLs verbatim — they're already constructed correctly.

1a. **Wait for the story to actually render before screenshotting.** `browser_navigate` returns when the document loads, but Storybook needs additional time to mount the story component. Do NOT use blind `setTimeout` — it wastes wall clock and is flaky on slow stories. Two reliable approaches:

   ```
   # Preferred — wait for a known element/text in the story body
   mcp__playwright__browser_wait_for { text: "Switch label", time: 10 }
   ```

   ```
   # Fallback — programmatically poll for Storybook's render-complete state
   mcp__playwright__browser_evaluate { function: "async () => {
     for (let i = 0; i < 50; i++) {
       const sel = window.__STORYBOOK_PREVIEW__?.urlStore?.selection
       const root = document.getElementById('storybook-root')
       if (sel && root && root.children.length > 0) return true
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

The filename is RELATIVE to the MCP's output-dir — pass just `local--components-button--button-default.png`, NOT `migration-runs/.../playwright/local--...png`. The MCP resolves the relative path internally.

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
