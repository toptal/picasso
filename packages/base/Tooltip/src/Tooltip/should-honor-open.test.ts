import type { OpenArbiterState } from './should-honor-open'
import { shouldHonorOpen } from './should-honor-open'

// A request every veto lets through; each case flips exactly the field(s) it
// is about, mirroring the truth table in should-honor-open.ts row by row.
const honorableState: OpenArbiterState = {
  reason: 'trigger-focus',
  isControlled: false,
  suppressReopen: false,
  followCursorHidden: false,
  followCursorUnsupported: false,
  isPointerModality: false,
}

describe('shouldHonorOpen', () => {
  it('vetoes when followCursor is unsupported (touch device)', () => {
    expect(
      shouldHonorOpen({ ...honorableState, followCursorUnsupported: true })
    ).toBe(false)
  })

  it('vetoes while the click-dismiss latch is held', () => {
    expect(shouldHonorOpen({ ...honorableState, suppressReopen: true })).toBe(
      false
    )
  })

  it('vetoes while a follow-cursor roam-hide is in effect', () => {
    expect(
      shouldHonorOpen({ ...honorableState, followCursorHidden: true })
    ).toBe(false)
  })

  it('vetoes a trigger-hover request — Picasso owns hover-open', () => {
    // Even in keyboard modality: the hover veto is about who owns the hover
    // timing, not about input modality.
    expect(shouldHonorOpen({ ...honorableState, reason: 'trigger-hover' })).toBe(
      false
    )
  })

  it('vetoes a pointer-initiated focus request [PF-2253]', () => {
    expect(
      shouldHonorOpen({
        ...honorableState,
        reason: 'trigger-focus',
        isPointerModality: true,
      })
    ).toBe(false)
  })

  it('honors a keyboard-initiated focus request', () => {
    expect(
      shouldHonorOpen({
        ...honorableState,
        reason: 'trigger-focus',
        isPointerModality: false,
      })
    ).toBe(true)
  })

  it('honors an imperative request regardless of modality', () => {
    expect(
      shouldHonorOpen({
        ...honorableState,
        reason: 'imperative-action',
        isPointerModality: true,
      })
    ).toBe(true)
  })

  describe('in controlled mode', () => {
    // Rows 2–4 are uncontrolled-only: a controlled tooltip's Picasso hover
    // timer is off, so base-ui's forwarded requests are its only open path and
    // must reach onOpen. Row 5 (pointer-focus) still vetoes — the sole
    // intended controlled-mode change. [PF-2253]
    const controlledState = { ...honorableState, isControlled: true }

    it('honors a trigger-hover request (restores controlled hover-open)', () => {
      expect(
        shouldHonorOpen({ ...controlledState, reason: 'trigger-hover' })
      ).toBe(true)
    })

    it('honors while the click-dismiss latch is held', () => {
      expect(
        shouldHonorOpen({ ...controlledState, suppressReopen: true })
      ).toBe(true)
    })

    it('honors while a follow-cursor roam-hide is in effect', () => {
      expect(
        shouldHonorOpen({ ...controlledState, followCursorHidden: true })
      ).toBe(true)
    })

    it('still vetoes a pointer-initiated focus request [PF-2253]', () => {
      expect(
        shouldHonorOpen({
          ...controlledState,
          reason: 'trigger-focus',
          isPointerModality: true,
        })
      ).toBe(false)
    })

    it('honors a keyboard-initiated focus request', () => {
      expect(
        shouldHonorOpen({
          ...controlledState,
          reason: 'trigger-focus',
          isPointerModality: false,
        })
      ).toBe(true)
    })

    it('still vetoes an unsupported follow-cursor request (touch device)', () => {
      // Row 1 is unconditional — unsupported means the tooltip never opens,
      // controlled or not.
      expect(
        shouldHonorOpen({ ...controlledState, followCursorUnsupported: true })
      ).toBe(false)
    })
  })
})
