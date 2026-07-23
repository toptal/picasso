import { isBrowser } from '@toptal/picasso-shared'

// Tracks the user's last input modality — pointer or keyboard — so a component
// can tell a pointer-initiated focus (a mousedown that focuses an element)
// from a keyboard-initiated one (Tab) at the moment the focus lands.
//
// Why this exists: `:focus-visible` (and base-ui's `matchesFocusVisible`,
// which its `useFocus` consults before opening popups on focus) cannot be
// relied on to make that distinction everywhere. It is unconditionally true
// under jsdom, true for the untrusted/programmatic focus a Cypress `.click()`
// dispatches, and true in real browsers for typeable targets (input/textarea/
// contenteditable) even when the focus came from a pointer. A component that
// must react to keyboard focus only (e.g. Tooltip suppressing its
// pointer-focus flash-open, PF-2253) therefore needs its own modality signal.
//
// The listeners run in the CAPTURE phase so the flag is set before any
// target-phase focus handler reads it, and so a descendant `stopPropagation`
// can't hide the modality. Tab's keydown precedes the focus it causes, so the
// flag self-corrects with no clearing logic. This generalizes base-ui's own
// Mac-Safari modality approach: base-ui only attaches equivalent window
// keydown/pointerdown listeners on Mac Safari, where it consults them instead
// of `matchesFocusVisible`; everywhere else it trusts `matchesFocusVisible` —
// which is exactly the check we can't rely on here. The pair is ref-counted:
// a page dense with subscribers shares ONE pair of window listeners rather
// than stacking N.
//
// SSR-safe: subscribe/unsubscribe no-op outside the browser, and the reader
// returns the keyboard default (`false`), which is correct server-side.
let pointerModality = false
let subscribers = 0

const handleWindowKeyDown = () => {
  pointerModality = false
}

const handleWindowPointerDown = () => {
  pointerModality = true
}

/**
 * Whether the last user input was pointer-driven (mouse/touch/pen) rather
 * than keyboard-driven. Read imperatively at the instant of interest — the
 * value is not reactive. Only meaningful while at least one
 * `subscribePointerModality` subscription is active.
 */
export const isPointerModality = (): boolean => pointerModality

/**
 * Start tracking input modality. Ref-counted: the window listeners are
 * attached on the first subscription only. Pair every call with
 * `unsubscribePointerModality` (typically in an effect cleanup).
 */
export const subscribePointerModality = (): void => {
  if (!isBrowser()) {
    return
  }

  if (subscribers++ === 0) {
    window.addEventListener('keydown', handleWindowKeyDown, true)
    window.addEventListener('pointerdown', handleWindowPointerDown, true)
  }
}

/**
 * Release a `subscribePointerModality` subscription. The window listeners are
 * detached when the last subscriber releases.
 */
export const unsubscribePointerModality = (): void => {
  if (!isBrowser()) {
    return
  }

  if (subscribers > 0 && --subscribers === 0) {
    window.removeEventListener('keydown', handleWindowKeyDown, true)
    window.removeEventListener('pointerdown', handleWindowPointerDown, true)
    // Reset to the keyboard default so a stale "pointer" reading can't leak
    // into the next subscriber that mounts before any input arrives.
    pointerModality = false
  }
}
