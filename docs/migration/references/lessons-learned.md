# Migration lessons learned

Auto-accumulated by the orchestrator after each successful component migration. Each entry captures the 2–3 patterns that the agent applied, so subsequent migrations of similar components inherit hard-won knowledge.

**How this file is updated.** When the orchestrator successfully opens a PR for a component, a small post-success step (in `bin/lib/orchestrator-core.ts`) extracts the 2–3 most useful patterns from the agent's commit + asks claude to summarize them. The summary is appended to this file. Subsequent runs include this file in `migrationWorkflow.contextPack`, so the agent reads it as part of its prompt.

**How to read this.** Skim for components that share your migration shape (Tier 0 light path, Tier 1 cleanup, Tier 2 heavy, etc.). The patterns are not prescriptive — they're what worked for that specific component. Apply judgment.

**How to add manual entries.** If you discover a pattern outside an orchestrator run (e.g. while doing a manual migration takeover after escalation), append it manually using the same shape:

```markdown
## <ComponentName> — <YYYY-MM-DD>

- Tier <0–5> · target_path: `<@base-ui/react/...>` or `none` · iterations: <N>
- Pattern A: <one-line description of a non-obvious shift>
- Pattern B: <ditto>
- Pattern C (optional): <ditto>
- Reference: <PR URL or commit SHA>
```

---

<!-- Entries appended below by orchestrator. Do not delete this marker. -->

## Button — 2026-05-08

- Tier 0 · target_path: `@base-ui/react/button` · iterations: 1
- Pin `@base-ui/react` to `^1.4.1` and widen the React peer to `>=16.12.0` (drop the `<19.0.0` upper bound) when swapping out `@mui/base`, since Base UI's peer range and the migration's React-19 readiness were both required for CI to resolve installs.
- Expect snapshot churn in *consumer* packages too (e.g. `Pagination`) from Base UI's added `data-disabled=""` attribute and the dropped trailing `base-` token — regenerate snapshots across every package that renders Button, not just Button's own.
- Replace MUI's `slots`/`slotProps`/`rootElementName` polymorphism with Base UI's `nativeButton` + `render={React.createElement(as)}` pattern (see `rules/base-ui-react-api-crib.md`).
- Reference: https://github.com/toptal/picasso/pull/4947

## `classes` prop strategy — 2026-05-11 (revoked withClasses mandate)

- Scope · target_path: cross-tier policy · iterations: post-PR-#4947 review
- **Tier 0**: drop `classes` from public Props via `extends Omit<StandardProps, 'classes'>` (precedent: Button PR #4947). The prop was already broken since the @mui/base era — no real API change, no `<Component>-diff.json`. Also destructure `classes: _classes` as runtime backstop for `{...rest}` spreads.
- **Tier 1 cleanup-only**: don't touch `classes` — no source change.
- **Tier 2/3**: ⚠️ DECISION PENDING (due 2026-05-11 week) — three options: `SlottedProps<K>` shared type / per-component Omit+narrow / drop entirely. Escalate any Tier 2/3 migration until decision lands. Don't apply the old `withClasses` pattern.
- See `decisions/classes-shim.md` for full revision history + pending Tier 2/3 options.
- Reference: PR #4947 review threads r3207767115 + r3207780637

## Computed-style diff is the authoritative diagnostic — 2026-05-15 (Slider PR #4955 stalemate lesson)

When Happo shows a small (~2–5 px) positional shift on a migrated component, **stop guessing from screenshots and run a computed-style diff** via Playwright's `browser_evaluate`. The diff between baseline (`picasso.toptal.net`) and local (`localhost:9001`) computed-style objects is a finite, deterministic list of properties — the answer is in there.

Empirical: Slider PR #4955 had 8 Storybook Happo diffs all on `Slider`. The agent burned 5 distinct fix attempts (`-translate-x-1/2`, `ml-[1.5px]`, `top-[50%] -translate-y-2/4`, `!absolute` Indicator restructure, etc.) over multiple sweep ticks. Every attempt was speculative — based on PNG inspection alone. None converged.

Root cause (found by reading master baseline source after the agent escalated): master's `Slider.tsx` thumb className had `-mt-[7px] -ml-[6px]` — negative margins for thumb centering with a **deliberate +1.5 px horizontal bias** (`-6px`, not `-7.5px`). The migration dropped these entirely, relying on `@base-ui/react`'s internal `translate: -50% -50%` which centers perfectly (0 px bias). Net: every Slider story renders ~1.5 px LEFT of where master rendered → visible diff in every Happo snapshot.

A computed-style diff (`getComputedStyle(thumbEl)` on both renders) would have shown `margin-left: -6px` vs `margin-left: 0px` immediately. Root cause identified in seconds instead of $20+ of speculative iter-cost.

**Forward rule** (now baked into `buildHappoFailureSection` prompt): stalemate is forbidden until the agent has captured `computed-styles-baseline.json` + `computed-styles-local.json` AND attempted at least 2 fixes targeting properties from the diff. Screenshots narrow the WHERE; computed styles tell you the WHAT.

## Visual parity policy — 2026-05-15 (pixel-perfect mandate + new tooling)

**Picasso is a UI kit.** A migration is an internal library swap; consumers must see byte-identical output across releases. ANY non-zero pixel diff on a migrated-component story is a REGRESSION to fix in source, not an "intentional consequence" to mark for designer accept. The "intentional visual change" bucket is now allowed ONLY when a per-component plan file (`docs/migration/components/<X>.md`) has an explicit "Approved visual deltas" section listing the specific delta. Self-declared "intentional" calls (e.g. "Base UI emits `data-orientation`, accept it") are misclassifications — the fix is a `[data-orientation]:` Tailwind selector that compensates, not a designer-accept.

Tooling that catches these from iter-1 onward (added 2026-05-14/15):

- **Pre-fetched Happo PNGs**: orchestrator now downloads each failed Happo diff pair's old/new PNG to `migration-runs/<run-date>/<Component>/happo-diffs/<idx>-<check-slug>/`. Both the migration agent (CI feed-to-agent) and the review-sweep agent get the local paths in their prompts and MUST `Read` each PNG (multimodal — Claude sees the pixels). Surrounding-signal heuristics ("Storybook is green, this must be flake") have produced wrong calls (Slider PR #4955, Backdrop PR #4954) and are no longer acceptable as classification basis.
- **Playwright comparison against `picasso.toptal.net`**: PROMPT-light/heavy §Visual verification requires capturing every story (and interaction state for interactive components) from `https://picasso.toptal.net/?path=/story/<id>` (pre-migration baseline) AND `http://localhost:9001/?path=/story/<id>` (worktree Storybook) for side-by-side comparison. Review-sweep starts Storybook automatically when `--with-mcp` + Happo failures are in scope and runs the same workflow.
- **Strict classification matrix**: REGRESSION-on-migrated-component is the DEFAULT; UNRELATED FLAKE only for diffs whose `component` field doesn't match the migration target; INTENTIONAL requires plan-file authorization. Constraint baked into `buildHappoFailureSection` in `bin/lib/orchestrator-core.ts` and into the migration prompts.

Common Tailwind/CSS compensations for `@base-ui/react` parity:
- New `data-*` attribute on slot → add `[data-attr]:<style>` selector replicating prior visual.
- Inline `style="transform: ..."` from `Positioner` → either match via utilities or override with explicit `style={{ transform: ... }}`.
- Dropped/added wrapper element shifts margins → adjust `gap`/`p-*`/`m-*` so geometry stays the same.
- `:focus-visible` replaced by `data-[focused]:` → mirror old outline rules under the new selector.
- Dropped `base-` class prefix → if anything visually depends on it, restore via Tailwind under the new selector.

## Backdrop — 2026-05-14 (review iter 3)

- Tier 0 · target_path: `none` · iterations: 3
- When dropping an `@mui/base` slot-props import, replace it with `BaseProps + React.HTMLAttributes<ElementTag>` and keep `ownerState`/injected `className` as typed-but-stripped props with a comment naming the still-coupled consumers (Modal/Drawer) — see `rules/base-ui-react-api-crib`.
- Every migration PR needs a changeset entry that documents both the internal type swap and the peer-dependency cap lift (`react < 19.0.0` → `>=16.12.0`), not just a "behavior unchanged" note.
- "Renders without crashing" tests must include a real assertion (`expect(container).toBeInTheDocument()`) — bare `render()` calls get flagged on review.
- Reference: https://github.com/toptal/picasso/pull/4954

## Slider — 2026-05-14 (review iter 1)

- Tier 0 · target_path: `@base-ui/react/slider` · iterations: 1
- Snapshot diffs reveal API drift on first render (e.g. missing `aria-valuemin`/`aria-valuemax`, `position: fixed` input, `id` collisions) — agents must inspect snapshot churn for accessibility/markup regressions and restore parity (or document rationale) rather than just `--updateSnapshot`, per `rules/api-preservation.md`.
- When @base-ui/react replaces a single MUI component with compound parts (Root/Control/Track/Indicator/Thumb), derive ownerState locally (range detection, mark positions, active mark) and route slot props through children — see `rules/base-ui-react-api-crib.md`; don't try to shim `slots`/`slotProps`.
- Don't widen peerDeps incidentally (`react: ">=16.12.0 < 19.0.0"` → `">=16.12.0"`) as part of an internals swap — keep the existing range unless React 19 support is the explicit, tested scope of the PR.
- Reference: https://github.com/toptal/picasso/pull/4955

## Slider — 2026-05-14 (review iter 2)

- Tier 0 · target_path: `@base-ui/react/slider` · iterations: 2
- Compound parts must keep the original `classes`/`slotProps` callsites' DOM-level styling intent (negative margins like `-mt-[7px] -ml-[6px]` were dropped here). Per the **Visual parity policy** entry above, any pixel diff on the migrated component is a regression to fix in source — `Read` the orchestrator-prefetched Happo PNGs at `migration-runs/<date>/Slider/happo-diffs/...` and compensate via Tailwind selectors, not by deferring to designer review.
- Range-vs-single value sliders need explicit `isRange` handling and `onChange` signature preservation `(event, value, activeThumbIndex)` — reviewers consistently flag dropped callback args and array/number normalization gaps when migrating from `@mui/base` to `@base-ui/react`.
- Custom slot components (Mark, ValueLabel) lose `ownerState`/`slotProps` plumbing in @base-ui/react; future migrations should define explicit typed props from iter-1 rather than retaining MUI-shaped prop interfaces — see `rules/base-ui-react-api-crib.md` for the compound-parts replacement pattern.
- Self-classifying Happo diffs as "INTENTIONAL: designer to accept" (Slider review-sweep iter 2 PR comment) is now explicitly forbidden by the **Visual parity policy** above — INTENTIONAL requires plan-file authorization, default is FIX. The 8 Storybook Slider diffs from this PR should be re-engaged on the next sweep tick with the new pixel-perfect prompt.
- Reference: https://github.com/toptal/picasso/pull/4955

## Slider — 2026-05-14 (review iter 3)

- Tier 0 · target_path: `@base-ui/react/slider` · iterations: 3
- When MUI's `onChange(event, value)` becomes base-ui's `onValueChange(value, eventDetails)`, write an adapter that preserves Picasso's public `(event, value, activeThumbIndex)` shape unchanged — silent signature drift on the public callback is a top reviewer flag (see rules/api-preservation).
- MUI `slots`/`slotProps` does NOT map 1:1 to base-ui — you must explicitly compose `Root`/`Control`/`Track`/`Indicator`/`Thumb` and hand-`.map` marks and multi-thumb/range arrays, since base-ui no longer auto-renders N thumbs from an array value (see rules/base-ui-react-api-crib).
- Lift derived logic into pure module-scope helpers (e.g. `generateMarkPositions`, `resolveThumbValues`, `formatValueLabel`, `isMarkActive`) instead of inlining in the render — keeps the component under ESLint `complexity`/`max-statements` caps that CI enforces on the migration PR.
- Reference: https://github.com/toptal/picasso/pull/4955

## Slider — 2026-05-15 (review iter 4)

- Tier 0 · target_path: `@base-ui/react/slider` · iterations: 4
- Wrap base-ui's new event-shape callbacks in an adapter that preserves the original public signature — here `handleValueChange((newValue, eventDetails)) → onChange(event, value, activeThumbIndex)` — so consumers don't break (see rules/api-preservation).
- Replace MUI's `slots`/`slotProps`/`ownerState` plumbing with explicit, derived props on custom subcomponents (e.g. SliderMark now takes `positionPercent`/`sliderValue`/`forceInactive` instead of MUI's `ownerState.value`+`markActive`), and compute the data MUI used to compute internally (mark positions, range-vs-single thumb values) at the wrapper level — per rules/base-ui-react-api-crib.
- Ship a `.changeset/*.md` entry alongside the migration calling out the @mui/base → @base-ui/react swap and any structural rebuild (compound parts here), since reviewers consistently flag missing release notes on major-bump migrations.
- Reference: https://github.com/toptal/picasso/pull/4955

## Slider — 2026-05-15 (review iter 7)

- Tier 0 · target_path: `@base-ui/react/slider` · iterations: 7
- Snapshot diffs that flip wrapper element from `<span>` to `<div>` and change DOM nesting depth signal a structural API change — reviewers flag these; verify against `rules/api-preservation` and call them out explicitly in the changeset rather than letting reviewers discover them in snapshots.
- Reconstructing slot props (marks, value labels, thumb positioning) as ad-hoc helpers (`generateMarkPositions`, `resolveThumbValues`, `formatValueLabel`) duplicates @base-ui/react primitives — consult `rules/base-ui-react-api-crib` first to use the library's compound parts (e.g. `Slider.Mark`) before hand-rolling math like `((markValue - min) / (max - min)) * 100`.
- The `!absolute` Tailwind important overrides and inline `position: relative` workarounds papering over @base-ui/react's default inline styles indicate a styling-collision pattern reviewers will flag — follow `rules/styling` for clearing library inline styles cleanly instead of `!important` escapes.
- Reference: https://github.com/toptal/picasso/pull/4955

## Switch — 2026-05-18

- Tier 0 · target_path: `@base-ui/react/switch` · iterations: 3
- Lift the `react` peer-dependency upper bound (drop `< 19.0.0` cap) in the migrated package's `package.json` — base-ui/react's peer range exceeds the legacy Picasso cap and consumer install resolution fails CI otherwise.
- Wrap base-ui's compound-part callback shape (e.g. `onCheckedChange(checked)`) to preserve the consumer-facing `onChange(event, checked)` signature at the public API surface — see `rules/api-preservation.md`.
- Replace `@mui/base/<Single>` slot-system imports with the `@base-ui/react/<x>` compound parts (`Root` + `Thumb`/equivalent) — see `rules/base-ui-react-api-crib.md` for the per-component part mapping.
- Reference: https://github.com/toptal/picasso/pull/4965

## Slider — 2026-05-18 (review iter 8)

- Tier 0 · target_path: `@base-ui/react/slider` · iterations: 8
- When converting @mui/base `slots`/`slotProps` to @base-ui/react compound parts, every `ownerState`-derived value (markActive, position, value, index) must be computed in the parent and passed via explicit typed prop interfaces to custom subcomponents — slot prop types like `SliderValueLabelSlotProps` and `ownerState` no longer exist as contracts (see rules/base-ui-react-api-crib).
- @base-ui/react ships no `marks` array prop and no `valueLabelFormat` — the parent must generate mark positions itself from `min/max/step` (defaulting `step` to a sane value to avoid NaN/infinite loops) and re-implement formatter helpers (`string | function | number`) locally so the public API stays parity-stable.
- Every migration PR needs a `.changeset/<component>-migration.md` major-version entry that names the structural change (compound parts replacing slots) plus an explicit behavioral-parity promise; without it reviewers consistently flag missing version-bump justification.
- Reference: https://github.com/toptal/picasso/pull/4955

## Backdrop — 2026-05-18 (review iter 5)

- Tier 0 · target_path: `none` · iterations: 5
- Forward consumer `className` into the rendered element via `cx(..., className)` rather than dropping it — silently discarding `className` is a reviewer red flag and breaks the consumer styling contract (see `rules/api-preservation`).
- When stripping injected slot props like `ownerState` from upstream `@mui/base` consumers, leave a brief comment explaining *why* the field is kept in the type but discarded at runtime, so reviewers don't read it as dead code.
- Tests must assert something (`expect(container).toBeInTheDocument()`), not just render — "renders without crashing" with no assertion gets flagged every time.
- Reference: https://github.com/toptal/picasso/pull/4954

## Backdrop — 2026-05-18 (review iter 6)

- Tier 0 · target_path: `none` · iterations: 6
- When replacing a slot-based parent API (e.g. `@mui/base/Modal`), explicitly merge consumer `className` into the internal `cx(...)` — otherwise parent-passed classes (like Modal's `base-Modal`) silently drop, as the snapshot churn here shows.
- If a leaf migrates ahead of its still-unmigrated parents, keep parent-injected props (e.g. `ownerState?: unknown`) typed and runtime-stripped with an inline comment naming the parent constraint, so reviewers don't ask "why is this here?"
- Smoke tests should assert something real (e.g. `expect(container).toBeInTheDocument()`) rather than a bare `render(...)` — reviewers consistently flag assertion-free render calls.
- Reference: https://github.com/toptal/picasso/pull/4954

## Slider — 2026-05-18 (review iter 9)

- Tier 0 · target_path: `@base-ui/react/slider` · iterations: 9
- Verify that `step` has a runtime default before consumers rely on it — the agent had to add `step = 1` because @base-ui/react no longer infers it the way @mui/base did, and reviewers flag missing defaults that previously came from the upstream library.
- When migrating compound-slot APIs (`slots`/`slotProps`/`onRender`-style render hooks), reconstruct the part tree explicitly with @base-ui/react compound parts and replace ownerState-based child props with plain typed props — see `rules/base-ui-react-api-crib.md` for the slot-to-parts mapping.
- Translate event-handler shape changes deliberately (e.g. @base-ui/react's `onValueChange(value, eventDetails)` → Picasso's `onChange(event, value, activeThumbIndex)`) and normalize `readonly number[]` to mutable arrays at the boundary, per `rules/api-preservation.md` — reviewers consistently catch silent signature drift here.
- Reference: https://github.com/toptal/picasso/pull/4955

## Drawer — 2026-05-18

- Tier 0 · target_path: `@base-ui/react/drawer` · iterations: 4
- Add a `.changeset/<component>-migration.md` major-bump entry that enumerates dependency removals (e.g. `@mui/base`, `@material-ui/core` peer), peer-range lifts (`react` upper-bound drop), and any behavioral additions (swipe-dismiss, `disablePortal` no-op) — required for CI changeset gating and consumer-facing release notes.
- When `@base-ui/utils@0.2.8` types leak into the migrated package's build, ship the existing root patch at `patches/@base-ui__utils@0.2.8.patch` via `pnpm.patchedDependencies` + `pnpm-lock.yaml` `patch_hash` rather than re-deriving — strips `const` from generic parameters that break TS project-reference builds.
- Remove obsolete sibling `tsconfig.json` `references` (here `../Backdrop`) when dropping the corresponding workspace dependency from `package.json`, otherwise `tsc -b` fails on the migration PR's "Build" job even though `pnpm install` succeeds.
- Reference: https://github.com/toptal/picasso/pull/4966

## Happo verifier URL construction — 2026-05-19 (root-cause for chronic Modal v2/v3 ERROR)

After two consecutive Modal runs (2026-05-19 v2 + v3) escalated on `happo:ERROR` after burning ~60 min × 2 of `happo-wait` polling, investigation revealed the bug was in the verifier itself, not a Happo service issue:

- **`pnpm happo run <sha> --only <Component>` uploads the report at the identifier `<sha>-<Component>`**, not bare `<sha>`. See `node_modules/happo.io/build/executeCli.js:34-36`:
  ```js
  if (commander.default.only) {
    usedSha = `${usedSha}-${commander.default.only}`;
  }
  ```
- **The verifier was querying the compare endpoint with BARE head SHA** (`comparisons/<base-bare>/<head-bare>/compare-results`). For Drawer this happened to return 200 because Happo had lazily created the bare-SHA-to-bare-SHA compare record on a prior request. For Modal, no such lazy record existed → consistent 404 → verifier emitted ERROR → migrate-loop wasted hours retrying with no possible resolution.
- **Direct evidence**: same Modal upload, two URLs:
  - `comparisons/<base>/<head>/compare-results` → 404 (what verifier queried)
  - `comparisons/<base>/<head>-Modal/compare-results` → 200 with `"summary":"No differences found.","unchangedCount":489` (what Happo actually has)
- **Probe endpoint was also wrong**: verifier hit `/api/reports/<sha>` plain; Happo CLI uses `/api/reports/<id>?project=<projectLabel>` (see `node_modules/happo.io/build/fetchReport.js`). Without the `project` query param the probe 404'd on perfectly-good reports.
- **Fix**: `bin/lib/happo-verify.ts` now constructs `headIdentifier = args.migratedComponent ? \`\${headSha}-\${args.migratedComponent}\` : headSha` and uses it in BOTH the compare URL and the probe URL, with the probe also passing `?project=<projectLabel>`. Base SHA stays bare (integration branch CI uploads with no `--only`).
- **Lesson for the verifier-style tooling**: when reverse-engineering a vendor API, always trace what the vendor's own CLI does (their `fetchReport.js`, `runCommand.js`, etc.) rather than guessing from URL shapes seen in dashboard links. Two `git blame`-traceable bugs (`/api/reports/<sha>` and `/comparisons/<base>/<head>/`) survived through Slider, Backdrop, Drawer migrations because Happo's lazy compare-record creation made them work most of the time.
- Reference: Modal v3 run 2026-05-19, agent commit `f946fb9e1`.

## Modal — 2026-05-18 (run discarded, restarted with orchestrator fixes)

- Tier 0 · target_path: `@base-ui/react/dialog` · iterations: 4 (discarded run; restarted clean)
- **`initialFocus`-on-Popup parity with `@mui/base/Modal`**: `@mui/base/Modal` auto-focuses the modal root on mount, moving focus off the trigger button. The `@base-ui/react` `Dialog.Popup` default `initialFocus={false}` leaves focus on the trigger → visible `focus-visible` ring on the trigger button persists when modal opens, surfacing as a Drawer-behind-Modal Cypress diff. Fix: `initialFocus={modalRef}` (where `modalRef` is the `Dialog.Popup` ref, which has `tabindex=-1` so it absorbs focus without rendering a visible ring). Modal.tsx ~line 318.
- **3 consumers of `@toptal/picasso-modal` have tests with snapshots that need regenerating**: `packages/base/PromptModal` (PromptModal wraps Modal as dialog primitive), `packages/base/Utils/src/utils/Modal` (`useModal` hook test), `packages/picasso-rich-text-editor` (ImagePluginModal). The local gate's consumer-stage detection now catches all three (was previously keyed only on `base-Modal` className in snap files, missed once snaps were regenerated to new Base UI DOM that uses `data-base-ui-portal` instead).
- **Heavy Tier 0 → Happo verifier needs >210s budget**: Modal renders 6 viewport targets × 11 stories → Happo upload + indexing routinely exceeds the verifier's 210s retry budget. Verifier emitting `status=ERROR` now FAILs the gate (was advisory-PASS pre-2026-05-18 fix), so migrate-loop must retry until indexing completes. Consider per-component `HAPPO_VERIFY_BUDGET` override for Modal-class components if 210s is consistently insufficient.
- **Same `@base-ui/utils@0.2.8` patch + tsconfig cleanup as Drawer** — see `patches/@base-ui__utils@0.2.8.patch` (strips `const` from generic params). Modal also removed obsolete `references` from `packages/base/Modal/tsconfig.json`.
- **Bootstrap-build-failure pitfall**: when `pnpm build:package` fails at orchestrator bootstrap (`continuing anyway (consumers stage may fail)` log line), do NOT run `pnpm jest -u` on consumer snaps until you've verified `pnpm --filter @toptal/picasso-<name> build:package` succeeds for the migrating package. PromptModal's test imports `@toptal/picasso-modal`; if the consuming module is stale or missing, jsdom renders an empty body and `jest -u` writes a 1-line snap that CI then diffs as `-1 / +120` lines.
- Reference: PR #4967 was closed + restarted to exercise the orchestrator fixes from scratch (consumer detection by import scan, happo-verifier ERROR-as-FAIL, auto-fix-snapshot stack-trace path extraction).

## Slider — 2026-05-18 (review iter 10)

- Tier 0 · target_path: `@base-ui/react/slider` · iterations: 10
- Debug/diagnostic JSON dumps (`after-fix-thumbs.json`, `baseline-tooltip-computed.json`, `local-thumb-computed.json`, `local-thumbs-all.json`) landed at the repo root — gitignore or delete pixel-diff/computed-style artifacts before opening the PR, since reviewers consistently flag committed scratch files.
- The `.changeset/` entry should explicitly state "behavioral parity" and name the @base-ui/react compound parts being assembled (`Slider.Root + Control + Track + Indicator + Thumb`), so reviewers can map old→new mentally instead of asking — capture this changeset shape in `rules/base-ui-react-api-crib`.
- @base-ui/react's `Slider.Thumb` renders a visible native `<input>` that requires `[&_input]:!top-auto [&_input]:!left-auto [&_input]:![clip-path:none] [&_input]:[clip:rect(0,0,0,0)]` overrides to hide — bake this input-hiding recipe into `rules/styling` (or the base-ui crib) for any input-bearing slot.
- Reference: https://github.com/toptal/picasso/pull/4955

## Drawer — 2026-05-19 (review iter 1)

- Tier 0 · target_path: `@base-ui/react/drawer` · iterations: 1
- Deprecate-don't-delete props that have no equivalent in the new library: keep the prop in the type with `@deprecated` JSDoc + ticket reference and route it to a `_unused` destructure, since silent removal breaks consumer types (see rules/api-preservation).
- When @base-ui/react components replace MUI ones, write a changeset that explicitly enumerates new implicit behaviors (swipe gestures, always-portaled, focus timing) so reviewers don't have to discover them — these are the questions reviewers consistently ask on first pass.
- When @base-ui/react's async focus management (rAF-deferred `FloatingFocusManager`) diverges from @mui/base's synchronous focus, add a `useIsomorphicLayoutEffect` blur-on-open shim with a comment explaining the timing difference, since reviewers flag visual-snapshot regressions without it.
- Reference: https://github.com/toptal/picasso/pull/4966

## Slider — 2026-05-19 (review iter 11)

- Tier 0 · target_path: `@base-ui/react/slider` · iterations: 11
- Delete throwaway debug artifacts (`*-thumbs.json`, `baseline-*.json`, `local-*.json`) before pushing — reviewers consistently flag stray investigation dumps at repo root, so future migrations should write them to a gitignored scratch dir from iter 1.
- Add the changeset under `.changeset/` with explicit "behavioral parity" framing and the new compound-parts surface enumerated (see `docs/migration/rules/api-preservation.md`) — reviewers expect the consumer-facing migration note up-front, not after a sweep.
- When `@base-ui/react/slider` requires compound parts (Root + Control + Track + Indicator + Thumb) that diverge from the old single-component shape, rebuild marks/value-label on those parts from iter 1 rather than patching the legacy structure — per `docs/migration/rules/base-ui-react-api-crib.md`, reviewers reject "minimal-diff" shims that fight the new API.
- Reference: https://github.com/toptal/picasso/pull/4955

## Drawer — 2026-05-20 (review iter 2)

- Tier 0 · target_path: `@base-ui/react/drawer` · iterations: 2
- Any prop that controls portal behavior (e.g. `disablePortal`) must be preserved on the first pass — before labeling it a breaking change, audit the new library's compound API; `@base-ui/react/drawer` lets you emulate it by conditionally omitting `<Drawer.Portal>` rather than needing a direct prop equivalent (reviewers will block on silent API removal that breaks internal and external consumers).
- New default behaviors introduced by `@base-ui/react` with no prior equivalent (e.g. swipe-to-dismiss from `Drawer.Root`) must appear in the changeset on iter 1 **and** be guarded by an opt-out prop, because reviewers treat undocumented behavior additions as blockers on the grounds they can collide with scrollable or draggable content inside the component.
- For upstream TS compatibility gaps bridging a pending dependency upgrade, prefer an inline `// @ts-ignore` over a `patchedDependencies` entry — patches add repo-wide maintenance overhead and reviewers will push back; reserve patches only when inline suppression would spread across many call sites.
- Reference: https://github.com/toptal/picasso/pull/4966

## Switch — 2026-05-20 (review iter 2)

- Tier 0 · target_path: `@base-ui/react/switch` · iterations: 2
- When @base-ui/react injects inline styles you need to override (e.g. the hidden input's `margin: -1px`), use an imperative `ref` callback to set `node.style.margin = '0'` — never reach for `!important`, which is a hard Picasso repo convention (comment 3).
- Avoid `as unknown as T` casts when bridging base-ui's event types to Picasso's legacy `onChange(event, checked)` signature; reviewers flag explicit casting as a repo anti-pattern, so restructure the adapter (different parameter types, a narrower overload, or a type guard) to avoid the double cast (comment 4).
- Verify all code changes are actually applied in the component file before opening the PR — reviewer comment 2 on `Switch.tsx:55` was triggered by the initial diff still showing the old `@mui/base` code, forcing an avoidable iteration solely to apply work that was already planned.
- Reference: https://github.com/toptal/picasso/pull/4965

## Slider — 2026-05-20 (review iter 12)

- Tier 0 · target_path: `@base-ui/react/slider` · iterations: 12
- The changeset was added in this iteration (new file), indicating reviewers flagged missing documentation of structural breaking changes — always include an explicit changeset note when @base-ui/react changes the root element type or nesting depth (the `<span>→<div>` and Control > Track wrapper depth increase here).
- @base-ui/react's `Slider.Thumb` renders its hidden `<input>` with `position:fixed; width/height:100%` and applies `translate:-50% -50%` inline on the thumb div; both cause Happo snapshot failures on first pass — apply the `resetInputRef` + `thumbPositionStyle` overrides (see `Slider.tsx:100-122`) before submitting snapshots for review.
- base-ui's `onValueChange` callback has a different signature than @mui/base's `onChange`; the adapter function `handleValueChange` (added in this iteration) was a reviewer-required fix — always wrap the new callback to re-expose `(event, value, activeThumbIndex)` and preserve the public API surface (see `rules/api-preservation`).
- Reference: https://github.com/toptal/picasso/pull/4955

## Backdrop — 2026-05-20 (review iter 9)

- Tier 0 · target_path: `none` · iterations: 9
- Don't add JSDoc (`/** ... */`) comments to internal passthrough props like `ownerState` — they surface in TS doc generation as public API, so strip the comment even if the prop must remain in the interface.
- When changing a Props interface, explicitly state in the changeset whether each modified prop is new or was previously inherited (e.g. via `ModalBackdropSlotProps`) so reviewers can verify the API surface didn't silently expand.
- Changeset semver bumps must be self-evident from the description alone — if the bump is `major`, list the specific breaking surface (removed import, lifted peer-dep cap, etc.) so reviewers don't have to ask why it isn't `minor` or `patch`.
- Reference: https://github.com/toptal/picasso/pull/4954

## Drawer — 2026-05-20 (review iter 3)

- Tier 0 · target_path: `@base-ui/react/drawer` · iterations: 3
- Preserve transition/animation parity from iter 1 — when swapping the underlying primitive, port the prior open/close motion (e.g. `data-[starting-style]`/`data-[ending-style]` translate classes on `Drawer.Popup`) before opening review; per `rules/base-ui-react-api-crib`, missing animations are a guaranteed regression flag.
- Prefer `@ts-expect-error`/`@ts-ignore` on the broken consumer lines over a `patches/*.patch` against a third-party `.d.ts` — patches are heavyweight, hard to maintain across upgrades, and reviewers will push back on them as the wrong tool for typecheck noise.
- Tailwind class order is semantically load-bearing with `twMerge` — put fixed positional/structural classes BEFORE caller-provided `className` so consumer overrides win, not the other way around (the `twMerge(className, '…')` ordering was flagged at Drawer.tsx:111).
- Reference: https://github.com/toptal/picasso/pull/4966

## Switch — 2026-05-20 (review iter 3)

- Tier 0 · target_path: `@base-ui/react/switch` · iterations: 3
- Preserve the public `onChange(event, checked)` signature when adapting base-ui's `onCheckedChange` — never narrow or rename consumer-facing handlers (see rules/api-preservation).
- Keep migration diffs scoped to the component: no stray scratch/tooling files (e.g. `fetch-happo-diffs.mjs`) in the PR — verify `git status` before opening.
- Avoid `as unknown as` casts on the whole `...rest` spread; if base-ui's root element type mismatches the public Props, address it at the prop-by-prop boundary rather than a blanket bridge cast.
- Reference: https://github.com/toptal/picasso/pull/4965
