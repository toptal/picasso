import type { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'

// Imported from base-ui deliberately: if base-ui renames a reason (e.g.
// `trigger-focus`), the build breaks here instead of silently mis-arbitrating.
type OpenReason = BaseTooltip.Root.ChangeEventDetails['reason']

export type OpenArbiterState = {
  reason: OpenReason
  // Whether the tooltip is controlled (consumer owns `open`). In controlled
  // mode Picasso's own hover-open timer is disabled, so base-ui's forwarded
  // `trigger-hover` is the consumer's ONLY hover-open path — the hover/latch/
  // roam vetoes must stay uncontrolled-only, as they were pre-refactor.
  isControlled: boolean
  // Click-dismiss latch: a click dismissed the tooltip and the pointer hasn't
  // left the trigger yet.
  suppressReopen: boolean
  // followCursor roam-hide: the cursor moved far enough to hide the popup and
  // hasn't settled yet.
  followCursorHidden: boolean
  // followCursor on a touch device — unsupported, the tooltip never opens.
  followCursorUnsupported: boolean
  // Last input modality was pointer (mouse/touch/pen), not keyboard.
  isPointerModality: boolean
}

/**
 * Decides whether an OPEN request reaching `handleOpenChange` — from base-ui
 * or otherwise — should be honored. Picasso owns this arbitration because it
 * runs its own MUI-compatible enter-delay hover timer while base-ui's Trigger
 * independently drives REST-based hover and instant focus opens; honoring
 * base-ui's requests unfiltered would run two differently-timed open machines
 * at once (see docs/decisions/23-tooltip-open-arbitration.md).
 *
 * First matching veto wins. Rows 2–4 are UNCONTROLLED-ONLY (they were gated
 * behind `!isControlled` pre-refactor): in controlled mode Picasso's hover
 * timer is off, so base-ui's forwarded `trigger-hover` is the consumer's only
 * hover-open and must reach `onOpen`. Rows 1 and 5 apply in BOTH modes — row 5
 * (pointer-focus suppression) newly applying to controlled mode is the only
 * intended controlled-mode behavior change [PF-2253].
 *
 * | # | Condition                              | Gated by      | Result | Why                                    |
 * |---|----------------------------------------|---------------|--------|----------------------------------------|
 * | 1 | followCursorUnsupported                | (always)      | veto   | touch + followCursor never opens       |
 * | 2 | suppressReopen                         | !isControlled | veto   | click-dismiss latch held               |
 * | 3 | followCursorHidden                     | !isControlled | veto   | roam-hide in effect                    |
 * | 4 | reason is trigger-hover                | !isControlled | veto   | Picasso owns hover via its enter-delay |
 * | 5 | reason is trigger-focus + pointer mode | (always)      | veto   | pointer-focus flash-open [PF-2253]     |
 * | 6 | otherwise (keyboard focus, imperative) |               | honor  |                                        |
 */
export const shouldHonorOpen = (state: OpenArbiterState): boolean => {
  if (state.followCursorUnsupported) {
    return false
  }

  if (!state.isControlled) {
    if (state.suppressReopen) {
      return false
    }

    if (state.followCursorHidden) {
      return false
    }

    if (state.reason === 'trigger-hover') {
      return false
    }
  }

  if (state.reason === 'trigger-focus' && state.isPointerModality) {
    return false
  }

  return true
}
