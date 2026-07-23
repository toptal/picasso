# Tooltip open arbitration

## Problem

The migrated (base-ui) Tooltip runs two open-timing models at once. base-ui's
`<Tooltip.Trigger>` drives hover and focus opens itself — its `useHover` is
REST-based (`restMs`: it opens once the cursor *stops*, not after an
enter-based delay) and its `useFocus` opens instantly on any focus it deems
focus-visible (both wired unconditionally on `TooltipTrigger`). Picasso,
meanwhile, must reproduce
legacy MUI enter-delay semantics, so it runs its own hover-open timer. To
reconcile the two, `handleOpenChange` became a referee that vetoed base-ui's
open requests one reason at a time — an accreting pile of inline
`if (...) return` guards (`trigger-hover` veto, click-dismiss `suppressReopen`
latch, follow-cursor roam-hide, `followCursorUnsupported`), joined most
recently by the PF-2253 pointer-focus suppression.

PF-2253 itself: a `mousedown` that focuses a tooltip trigger makes base-ui
open the popup mid-click (reason `trigger-focus`). base-ui's
`matchesFocusVisible` check cannot tell pointer focus from keyboard focus in
several environments — it is unconditionally true under jsdom, true for the
untrusted focus a Cypress `.click()` dispatches, and true in real browsers for
typeable triggers (input/textarea/contenteditable). The popup can flash open
over its own trigger and swallow the trailing click, leaving the wrapped
control effectively unclickable.

Two smells, inappropriate for a UI-kit primitive:

1. Behavioral logic scattered as ad-hoc early returns rather than one
   coherent, testable decision.
2. Environment knowledge (jsdom/Cypress/`matchesFocusVisible` lore) baked into
   the runtime component.

## Proposal

**Picasso owns open arbitration.** Every open request reaching
`handleOpenChange` — controlled or uncontrolled — passes through one pure
predicate, `shouldHonorOpen` (`packages/base/Tooltip/src/Tooltip/should-honor-open.ts`).
Of base-ui's own open reasons, only a keyboard-modality `trigger-focus` is
honored; base-ui keeps owning every close/dismiss path.

First matching veto wins (rows evaluated for open requests only):

| # | Condition                                    | Gated by      | Result | Rationale                                        |
|---|----------------------------------------------|---------------|--------|--------------------------------------------------|
| 1 | `followCursorUnsupported`                    | (always)      | veto   | touch device + `followCursor` → never open       |
| 2 | `suppressReopen`                             | `!isControlled` | veto | click-dismiss latch held                         |
| 3 | `followCursorHidden`                         | `!isControlled` | veto | roam-hide in effect                              |
| 4 | `reason === 'trigger-hover'`                 | `!isControlled` | veto | Picasso owns hover via its own enter-delay timer |
| 5 | `reason === 'trigger-focus'` + pointer modality | (always)   | veto | pointer-initiated focus flash-open (PF-2253)     |
| 6 | otherwise (keyboard focus, imperative)       |               | honor  |                                                  |

Rows 2–4 stay uncontrolled-only, exactly as they were before this refactor: in
controlled mode Picasso's own hover-open timer is disabled, so base-ui's
forwarded `trigger-hover` is the consumer's ONLY hover-open path and must reach
`onOpen` (e.g. `TypographyOverflow`, which drives `open`/`onOpen` from the
tooltip). The **sole** controlled-mode behavior change is row 5: a
pointer-initiated focus no longer opens a controlled tooltip either.

Supporting pieces:

- **Input modality** is tracked by a shared, ref-counted util —
  `isPointerModality`/`subscribePointerModality`/`unsubscribePointerModality`
  in `@toptal/picasso-utils` (`packages/base/Utils/src/utils/pointer-modality.ts`).
  Window-capture `keydown`/`pointerdown` listeners mirror base-ui's own
  Mac-Safari modality approach — base-ui only attaches equivalent window
  listeners on Mac Safari (where it consults them *instead of*
  `matchesFocusVisible`); everywhere else it relies purely on
  `matchesFocusVisible`, which is exactly the check we can't trust here. A
  window-level flag (not a trigger-scoped ref) also covers
  label-click-focuses-input, where the pointerdown never lands on the trigger.
  The util's doc-comment is the single home for the environment rationale.
- **Controlled mode** runs through the same arbiter (`shouldHonorOpen` is
  called before the controlled/uncontrolled split), but rows 2–4 remain
  uncontrolled-only, so a controlled consumer's `onOpen` still fires for
  base-ui's forwarded hover/latch/roam requests exactly as before. Only the
  row-5 pointer-focus veto is newly applied to controlled tooltips.
- The reason type is imported from base-ui
  (`BaseTooltip.Root.ChangeEventDetails['reason']`), so a reason rename breaks
  the build rather than silently mis-arbitrating.

### Drawbacks and limitations

- Controlled consumers see one fewer `onOpen` case than before: a
  pointer-initiated focus no longer opens a controlled tooltip. Hover/latch/
  roam requests are unaffected (rows 2–4 stay uncontrolled-only).
- Pointer-focus suppression is stricter than the pre-migration (MUI) build for
  tooltip-wrapped inputs, which previously flashed open on click.
- **Latched pointer modality also suppresses focus-opens for programmatic
  `.focus()` that follows a pointer interaction** — e.g. validation-focus on
  an invalid field after a click, or focus-restore to a trigger after a modal
  closes on a pointer press. The modality stays "pointer" until the next
  keydown, so such a programmatic focus won't open the tooltip, whereas
  `:focus-visible` would still match for a typeable target. This is a
  deliberate trade for killing the flash-open; in practice many error-tooltip
  patterns are controlled and drive `open` themselves, so they're unaffected
  by the focus-open path at all.
- The modality flag is module-global state; tests that assert focus-opens must
  pin the modality explicitly (a `keydown` for keyboard, a `pointerdown` for
  pointer) rather than rely on test order.
- A ref-count imbalance (unmatched unsubscribe) is guarded against going
  negative; the worst case is a lingering, harmless pair of listeners — never
  an early detach.

## Alternatives

- **Fully-controlled/imperative rewrite** — neuter base-ui's Trigger and drive
  `open` entirely from Picasso. Rejected: base-ui's Trigger wires
  `useHover`/`useFocus` unconditionally, gated only by `disabled` — and
  `disabled` also forces `open=false` on the Root, so opting out of its
  interactions means re-implementing accessibility and dismiss behavior
  wholesale.
- **`:focus-visible` polyfill** — rejected: base-ui already calls
  `matchesFocusVisible`; a polyfill double-counts and only "helps" under
  jsdom, where we need the opposite (jsdom reports every focus as
  focus-visible).
- **Reducer/XState machine** — rejected as over-engineering for one boolean of
  open state; a pure predicate over five inputs is fully testable without a
  state-machine runtime.
- **`usePointerModality()` React hook** — rejected: modality is read
  imperatively at the open instant and never rendered, so a hook would only
  add re-render plumbing.

## Research data

- [PF-2253](https://toptal-core.atlassian.net/browse/PF-2253) — pointer-focus
  flash-open swallowing the trailing click.
- [PF-2245](https://toptal-core.atlassian.net/browse/PF-2245) — the earlier
  click-during-hover-delay latch bug; its invariant (a click landing inside
  the enter-delay window must not dismiss-and-latch the in-flight open) is
  preserved by the arbitration and covered by regression tests in
  `packages/base/Tooltip/src/Tooltip/test.tsx`.
- base-ui 1.6.0 sources: `TooltipTrigger` wires `useHover`/`useFocus`
  unconditionally on the Trigger (gated only by `disabled`); `TooltipRoot`
  forces `open=false` while `disabled`; `useFocus` decides focus-visibility via
  `matchesFocusVisible` in general, and only on Mac Safari attaches its own
  window keydown/pointerdown listeners which it consults *instead of*
  `matchesFocusVisible` there (they do not feed it). That Mac-Safari carve-out
  is the approach this util generalizes.
- Ticket: [PF-2253](https://toptal-core.atlassian.net/browse/PF-2253); implemented
  in PR #5057.
