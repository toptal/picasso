# Happo iteration — visual regression authority

The migration gate runs `pnpm happo --only <Component>` after Playwright verification. Happo is the **authoritative visual regression check** — screenshots get uploaded to https://happo.io and diffed against master's baseline.

## Setup precondition

Happo is mandatory locally — the gate fails if `HAPPO_API_KEY` / `HAPPO_API_SECRET` aren't set in your env. If you see "HAPPO_API_KEY unset" in the gate log, STOP and ask the operator to set them up (see `ORCHESTRATOR.md` §Happo setup).

## When Happo reports diffs

The orchestrator pre-downloads each diff pair's old/new PNG under:

```
migration-runs/<run-date>/<Component>/happo-diffs/<idx>-<check-slug>/<idx>-<component>-<variant>-<target>.{old,new}.png
```

**Read each PNG via the multimodal `Read` tool** — that's the authoritative source. The Happo report URL (`https://happo.io/a/<account>/p/<project>/compare/<sha1>/<sha2>`) is a fallback if pre-fetch failed.

## Classification matrix

Every Happo diff falls into one of three classes:

| Class | Definition | Action |
|---|---|---|
| **REGRESSION** | DEFAULT for any non-zero pixel diff on a story whose `component` field matches the migration target | Fix in source. Iterate Tailwind/CSS until local matches baseline byte-for-byte. |
| **UNRELATED FLAKE** | The diff's `component` field does NOT match the migration target | Document briefly, do not fix. Happo's flakes resolve on re-run. |
| **INTENTIONAL** | Pre-approved design-led change with operator authorization | Allowed ONLY if `docs/migration/components/<Component>.md` has an "Approved visual deltas" section enumerating the specific delta. |

**A `dimension_mismatch` verdict is ALWAYS REGRESSION.** When the pixel-diff analysis reports `dimension_mismatch` (the snapshot's width/height changed) on a story whose `component` matches the migration target, the element changed SIZE — that traces to a box-model/line-box property you changed (`line-height`, `box-sizing`, `padding`, `border-width`, `font-size`), never to an environmental/flake cause and never to an approved-delta. Diff the pre-migration source styles (old `createStyles` + any `PicassoProvider.override`) against your new Tailwind classes property-by-property; the dropped/changed property IS the fix. A dropped pinned `line-height` → `line-height: normal` is the canonical case (Checkbox PF-1994).

### INTENTIONAL is effectively forbidden

Self-declared "INTENTIONAL" calls have produced wrong outcomes:

- **Slider PR #4955**: 8 diffs labeled INTENTIONAL ("Base UI emits `data-orientation`, accept it"). Wrong — those diffs needed CSS compensation with `[data-orientation]:` selectors. The agent burned 5 distinct fix attempts before the operator's intervention pointed at the real root cause (a missed `margin-left: -6px` for thumb centering).
- **Backdrop PR #4954**: similar misclassification cluster.

The pattern: when the agent reaches for INTENTIONAL, the actual fix is almost always a Tailwind selector compensating for the new DOM. Treat the urge to use INTENTIONAL as a STOP signal — read the `@base-ui/react` source for the affected slot, then fix in source.

## Confidence stages during iteration

| Stage | Confidence | Action |
|---|---|---|
| Iter 1 — first diff visible | LOW | Read PNG, compare baseline vs new. Don't fix yet — diagnose first. |
| After computed-style diff captured | MEDIUM | Capture `getComputedStyle()` JSON for baseline + local. The diff between the two is a finite, deterministic list of properties — the answer is in there (Slider stalemate lesson). |
| After 2 attempts targeting properties from the computed-style diff | HIGH | If still failing, escalate: read more `@base-ui/react` source, check for double-positioning conflicts, ask the operator. |
| 3+ attempts without convergence | STALEMATE | Stop. Stalemate is forbidden until the agent has captured `computed-styles-baseline.json` + `computed-styles-local.json` AND attempted at least 2 fixes targeting properties from the diff. Screenshots narrow the WHERE; computed styles tell you the WHAT. |

## Worked diff-classification example

**Scenario.** Happo run after migrating Slider returns 9 diffs:

```
1. slider-default     (chrome)     +400px shift  → ?
2. slider-default     (firefox)    +400px shift  → ?
3. slider-tooltip     (chrome)     +400px shift  → ?
4. slider-range       (chrome)     thumb 2px left → ?
5. button-default     (chrome)     1px outline   → ?
6. modal-confirm      (chrome)     12px shift    → ?
7. slider-marks       (chrome)     thumb 2px left → ?
8. slider-disabled    (chrome)     thumb 2px left → ?
9. slider-tooltip     (firefox)    +400px shift  → ?
```

**Classification:**

- Diffs 1, 2, 3, 9: large positional shift on Slider stories. `component=slider` → REGRESSION. Likely the same root cause — read one PNG carefully, then check whether the others share a positioning property in their computed-style diff.
- Diffs 4, 7, 8: small (2px) thumb-left shift on Slider stories. `component=slider` → REGRESSION. Capture computed-style diff on the thumb element; compare with baseline. (Slider stalemate lesson: this is the `margin-left: -6px` thumb-centering bias.)
- Diff 5: 1px outline on `button-default`. `component=button` does NOT match migration target (Slider). → UNRELATED FLAKE. Document and re-run.
- Diff 6: 12px shift on `modal-confirm`. `component=modal` ≠ slider → UNRELATED FLAKE. Document.

**Fixes needed**: two for Slider (the large shift + the 2px thumb-centering). 7 diffs → 2 underlying fixes. Apply, re-run Happo, expect green on Slider stories; the button + modal diffs may persist as Happo retries flake them out independently.

## Computed-style diff is the authoritative diagnostic

When Happo shows a positional shift (~2-5 px) on a migrated component, **stop guessing from screenshots and run a computed-style diff** via Playwright's `browser_evaluate`:

```js
// Run in browser_evaluate after navigating to baseline:
const el = document.querySelector('[data-testid="slider-thumb"]');
const styles = getComputedStyle(el);
return Object.fromEntries(
  Array.from(styles).map(k => [k, styles.getPropertyValue(k)])
);
```

Save the baseline computed styles, then repeat on local. Diff the two JSON objects — the answer is in there. Skip this step at your peril; it's the only way to converge on a fix without burning 5+ speculative iterations.

### "It doesn't reproduce on localhost" is not a verdict

A font-metric diff (anything driven by `line-height` / `letter-spacing` / glyph metrics) will NOT reproduce in your local Playwright render: proxima-nova is domain-locked (loads only from `use.typekit.net` on toptal.* domains), so `localhost:9001` falls back to Arial with different metrics. That is EXPECTED, and is **not** evidence the diff is environmental, flaky, or unfixable. The Happo cloud render (and the downloaded `.old`/`.new` PNGs) use the real font and ARE authoritative. When local repro fails, stop comparing rendered boxes and diff the SOURCE styles (old `createStyles` / `PicassoProvider.override` vs your new Tailwind) instead. See `references/visual-verification.md §"The production font is domain-locked"`.

## Exit criterion for Happo

Happo verifier returns green (zero non-flake diffs on the migrated component) for the migration's head commit OR all remaining diffs are flagged INTENTIONAL with an operator-approved entry in `docs/migration/components/<Component>.md`.
