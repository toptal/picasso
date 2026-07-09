import type { ChangeEvent, MouseEvent, TouchEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import type { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import { toReactEvent } from '@toptal/picasso-shared'
import { isPointerDevice } from '@toptal/picasso-utils'

// followCursor: base-ui's cursor tracking only repositions the popup; it never
// hides when the pointer roams far from where the tooltip opened. Restore the
// legacy "hide while moving, reopen once the cursor settles" behavior (parity
// with the removed use-tooltip-follow-cursor.ts) — close once the pointer moves
// past FOLLOW_CURSOR_CLOSE_DISTANCE from where the current move began, and
// reopen after it rests for FOLLOW_CURSOR_STOP_DELAY.
const FOLLOW_CURSOR_CLOSE_DISTANCE = 50
const FOLLOW_CURSOR_STOP_DELAY = 250

// Tap-vs-scroll discrimination for the touch-open path: a touch gesture that
// travels more than this many px from where it started is a scroll/swipe, not
// a tap, and must not open the tooltip (see handleTriggerTouchMove). 10px is
// the conventional tap slop used by mobile toolkits to tell taps from drags.
const TOUCH_TAP_SLOP = 10

type Props = {
  /** Programatically control tooltip's visibility */
  open?: boolean
  /** Disables all listeners */
  disableListeners?: boolean
  /** Follow the cursor while hovering the trigger */
  followCursor?: boolean
  /** Delay (ms) before a hover opens the tooltip */
  openDelay: number
  /** Called when tooltip is opened */
  onOpen?: (event: ChangeEvent<{}>) => void
  /** Called when tooltip is closed */
  onClose?: (event: ChangeEvent<{}>) => void
  /** Called after the tooltip close transition finishes */
  onTransitionExiting?: () => void
  /** Called after the tooltip close transition finishes */
  onTransitionExited?: () => void
}

type TooltipState = {
  open: boolean
  handleOpenChange: BaseTooltip.Root.Props['onOpenChange']
  handleOpenChangeComplete: (nextOpen: boolean) => void
  handleTriggerClick: (event: MouseEvent<HTMLElement>) => void
  handleTriggerTouchStart: (event: TouchEvent<HTMLElement>) => void
  handleTriggerTouchMove: (event: TouchEvent<HTMLElement>) => void
  handleTriggerTouchEnd: (event: TouchEvent<HTMLElement>) => void
  handleTriggerMouseOver: (event: MouseEvent<HTMLElement>) => void
  handleTriggerMouseMove: (event: MouseEvent<HTMLElement>) => void
  handleTriggerMouseLeave: (event: MouseEvent<HTMLElement>) => void
}

type Point = { x: number; y: number }

// First contact point of a touch event. jsdom-synthesized test events may
// carry no `touches` list at all, so read defensively.
const getTouchPoint = (event: TouchEvent<HTMLElement>): Point | null => {
  const touch = event.touches?.[0]

  return touch ? { x: touch.clientX, y: touch.clientY } : null
}

const isPastTapSlop = (start: Point, point: Point): boolean =>
  Math.abs(point.x - start.x) > TOUCH_TAP_SLOP ||
  Math.abs(point.y - start.y) > TOUCH_TAP_SLOP

// Picasso owns the open state rather than delegating to @base-ui/react's
// built-in visibility tracking: base-ui requests open/close changes via
// `onOpenChange` (hover, focus, outside-press, escape) and Picasso decides
// whether to honor them. This preserves the legacy click-to-dismiss behavior —
// clicking an open tooltip closes it and suppresses re-opening until the
// pointer leaves the trigger — which base-ui's hover model does not provide.
export const useTooltipState = ({
  open,
  disableListeners,
  followCursor,
  openDelay,
  onOpen,
  onClose,
  onTransitionExiting,
  onTransitionExited,
}: Props): TooltipState => {
  // `hover: hover`/`pointer: fine` media probe, as the legacy hook used. On
  // touch devices the tooltip opens on tap (see handleTriggerClick) and
  // followCursor is unsupported entirely — parity with @material-ui@5.
  const isTouchDevice = !isPointerDevice()
  const followCursorUnsupported = Boolean(followCursor) && isTouchDevice

  const isControlled = open !== undefined
  const [internalOpen, setInternalOpen] = useState(false)
  // followCursor on a touch device never shows the tooltip, even when
  // controlled — exactly the legacy getTooltipOpenState.
  const actualOpen = followCursorUnsupported
    ? false
    : isControlled
    ? open
    : internalOpen
  const openRef = useRef(actualOpen)

  openRef.current = actualOpen

  // Single state setter (uncontrolled only): updates the ref eagerly so
  // duplicate requests landing in the same tick — before React re-renders —
  // are already deduped by the `openRef` guards below.
  const setOpen = (nextOpen: boolean) => {
    openRef.current = nextOpen
    setInternalOpen(nextOpen)
  }

  // After a click-to-close, the pointer is still resting on the trigger, so
  // base-ui would immediately re-request open. Suppress that until the pointer
  // leaves the trigger (legacy `ignoreOpening` behavior — see
  // handleTriggerMouseLeave, which lifts it).
  const suppressReopenRef = useRef(false)

  // Pending hover-open timer (see handleTriggerMouseOver).
  const openTimerRef = useRef<ReturnType<typeof setTimeout>>()

  // Set when a tap's `touchend` just opened the tooltip: the same tap
  // synthesizes a `click` after `touchend`, which handleTriggerClick would
  // read as click-to-dismiss and immediately close what the finger only meant
  // to open. The flag consumes exactly that one trailing click (the analog of
  // the legacy MUI Tooltip's `ignoreNonTouchEvents` touch/click dedupe).
  const touchOpenedRef = useRef(false)

  // Where the current touch gesture began; null means "no pending tap-open"
  // (handleTriggerTouchMove nulls it once the finger scrolls past the slop).
  const touchStartPositionRef = useRef<Point | null>(null)

  // followCursor move tracking (see FOLLOW_CURSOR_* constants). `moveStartRef`
  // anchors the current move segment; `followCursorHiddenRef` blocks base-ui
  // from re-opening while we hold it hidden mid-move; `stopTimerRef` fires the
  // settle-and-reopen; `targetHoveredRef` gates that reopen to an actual hover.
  const moveStartRef = useRef<{ x: number; y: number } | null>(null)
  const followCursorHiddenRef = useRef(false)
  const stopTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const targetHoveredRef = useRef(false)
  const lastMoveEventRef = useRef<Event | null>(null)

  useEffect(
    () => () => {
      clearTimeout(openTimerRef.current)
      clearTimeout(stopTimerRef.current)
    },
    []
  )

  const handleOpenChange: BaseTooltip.Root.Props['onOpenChange'] = (
    nextOpen,
    eventDetails
  ) => {
    // Only report real transitions: base-ui re-requests the current state
    // (its own hover timer races Picasso's mouseover timer, and it emits
    // close→open churn as the pointer crosses the trigger's rounded corners),
    // and the legacy Tooltip never fired onOpen while open or onClose while
    // closed.
    if (nextOpen === openRef.current) {
      return
    }

    if (!nextOpen) {
      if (!isControlled) {
        setOpen(false)
      }

      onClose?.(toReactEvent<ChangeEvent<Element>>(eventDetails.event))

      return
    }

    // Gate open requests BEFORE any callback fires (the legacy handleOpen
    // returned before onOpen when `ignoreOpening` was set): a click-dismissed
    // tooltip stays closed — and silent — until the pointer leaves the
    // trigger, and followCursor holds the popup hidden while the cursor is
    // mid-move (its settle timer reopens it and reports onOpen itself).
    if (
      !isControlled &&
      (suppressReopenRef.current || followCursorHiddenRef.current)
    ) {
      return
    }

    if (followCursorUnsupported) {
      return
    }

    if (!isControlled) {
      setOpen(true)
    }

    onOpen?.(toReactEvent<ChangeEvent<Element>>(eventDetails.event))
  }

  const handleTriggerClick = (event: MouseEvent<HTMLElement>) => {
    if (isControlled || disableListeners) {
      return
    }

    // The synthetic click trailing the tap that just opened the tooltip
    // (see handleTriggerTouchEnd) — consume it so tap-to-open doesn't
    // instantly toggle into click-to-dismiss.
    if (touchOpenedRef.current) {
      touchOpenedRef.current = false

      return
    }

    if (openRef.current) {
      suppressReopenRef.current = true
      clearTimeout(openTimerRef.current)
      setOpen(false)
      onClose?.(toReactEvent<ChangeEvent<Element>>(event.nativeEvent))
    } else if (
      isTouchDevice &&
      !followCursorUnsupported &&
      !suppressReopenRef.current
    ) {
      // Click-to-open is a TOUCH affordance only (a tap cannot hover): the
      // legacy handleClick opened on click solely for touch devices, while on
      // desktop opening stays owned by hover + openDelay.
      setOpen(true)
      onOpen?.(toReactEvent<ChangeEvent<Element>>(event.nativeEvent))
    }
  }

  // Arm the tap-to-open gesture — the touch-open path that reaches DISABLED
  // controls (touch events bubble to the trigger, while the HTML spec bars
  // disabled form controls from `click`, so handleTriggerClick alone leaves
  // the disabled-in-a-`<span>` pattern unopenable by touch). Mirrors
  // handleTriggerMouseOver, the bubbling hover-open workaround for the same
  // pattern; base-ui has no touch-open of its own. The open itself happens in
  // handleTriggerTouchEnd, NOT here: opening on `touchstart` would also fire
  // for a scroll/swipe that merely begins on the trigger, leaving a stuck
  // tooltip (no mouseleave ever closes it on touch) — see
  // handleTriggerTouchMove, which disarms the gesture past TOUCH_TAP_SLOP.
  const handleTriggerTouchStart = (event: TouchEvent<HTMLElement>) => {
    // A new gesture begins: a dedupe flag left over from a previous
    // touch-open whose synthetic click never arrived (disabled targets emit
    // none) is stale — clear it so this tap's own click, if any, acts.
    touchOpenedRef.current = false
    touchStartPositionRef.current = null

    if (
      isControlled ||
      disableListeners ||
      // Tap-to-open is a touch-device affordance, exactly like the click
      // branch above — on pointer devices opening stays owned by hover.
      !isTouchDevice ||
      followCursorUnsupported ||
      // Already open: this gesture's trailing click dismisses (see
      // handleTriggerClick) — don't arm a re-open for the same tap.
      openRef.current
    ) {
      return
    }

    // Touch analog of the mouseleave that lifts the click-dismiss latch on
    // pointer devices (mouseleave never fires on touch): a fresh tap gesture
    // beginning with the tooltip CLOSED is intent to open — the previous
    // tap-dismiss no longer holds.
    suppressReopenRef.current = false

    // jsdom-synthesized touchstarts may omit coordinates — fall back to the
    // origin so a coordinate-less tap (no touchmove) still opens.
    touchStartPositionRef.current = getTouchPoint(event) ?? { x: 0, y: 0 }
  }

  // Disarm the pending tap-open once the finger travels past the tap slop:
  // the gesture is a scroll/swipe, and a tooltip opened by it would be stuck
  // (roam-to-close is mouse-only; nothing on a touch device closes it).
  const handleTriggerTouchMove = (event: TouchEvent<HTMLElement>) => {
    const start = touchStartPositionRef.current
    const point = getTouchPoint(event)

    if (start && point && isPastTapSlop(start, point)) {
      touchStartPositionRef.current = null
    }
  }

  // Complete the tap-to-open: the finger lifted without scrolling (see
  // handleTriggerTouchStart, which armed the gesture). Disabled controls
  // still reach this — touch events all fire on them; only `click` is barred
  // — so the disabled-element pattern keeps working.
  const handleTriggerTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const isTap = touchStartPositionRef.current !== null

    touchStartPositionRef.current = null

    if (
      !isTap ||
      isControlled ||
      disableListeners ||
      !isTouchDevice ||
      followCursorUnsupported ||
      suppressReopenRef.current ||
      openRef.current
    ) {
      return
    }

    setOpen(true)
    onOpen?.(toReactEvent<ChangeEvent<Element>>(event.nativeEvent))
    touchOpenedRef.current = true
  }

  const handleOpenChangeComplete = (nextOpen: boolean) => {
    if (!nextOpen) {
      onTransitionExiting?.()
      onTransitionExited?.()
    }
  }

  // Open on `mouseover` in addition to base-ui's own hover tracking. `mouseover`
  // bubbles and fires on entry, so it reliably opens the tooltip even when the
  // hover originates on a descendant of the trigger — e.g. a disabled control
  // wrapped in a `<span>` trigger, where base-ui's movement-based open is not
  // dispatched. This restores the legacy behavior the Picasso components rely on
  // (Radio/Checkbox forward `onMouseOver`/`onMouseLeave` to their root for this).
  // base-ui still owns closing (it requests `onOpenChange(false)` on leave), so
  // this only adds a more robust open path and never blocks one.
  const handleTriggerMouseOver = (event: MouseEvent<HTMLElement>) => {
    targetHoveredRef.current = true

    if (
      isControlled ||
      disableListeners ||
      followCursorUnsupported ||
      suppressReopenRef.current ||
      openRef.current
    ) {
      return
    }

    const { nativeEvent } = event

    clearTimeout(openTimerRef.current)
    openTimerRef.current = setTimeout(() => {
      // base-ui's own hover path may have opened it first within the delay
      // (handleOpenChange already reported that onOpen), or a click may have
      // dismissed it meanwhile — in either case this timer has nothing to do.
      if (openRef.current || suppressReopenRef.current) {
        return
      }

      setOpen(true)
      onOpen?.(toReactEvent<ChangeEvent<Element>>(nativeEvent))
    }, openDelay)
  }

  // followCursor only: hide while the pointer roams far from where the tooltip
  // opened, and reopen once it settles — base-ui's cursor tracking repositions
  // but never hides, which leaves the popup lingering under a distant cursor.
  const handleTriggerMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (isControlled || disableListeners || !followCursor || isTouchDevice) {
      return
    }

    const position = { x: event.clientX, y: event.clientY }

    moveStartRef.current ??= position
    lastMoveEventRef.current = event.nativeEvent

    const movedTooFar =
      Math.abs(position.x - moveStartRef.current.x) >
        FOLLOW_CURSOR_CLOSE_DISTANCE ||
      Math.abs(position.y - moveStartRef.current.y) >
        FOLLOW_CURSOR_CLOSE_DISTANCE

    if (movedTooFar && openRef.current) {
      followCursorHiddenRef.current = true
      setOpen(false)
      onClose?.(toReactEvent<ChangeEvent<Element>>(event.nativeEvent))
    }

    clearTimeout(stopTimerRef.current)
    stopTimerRef.current = setTimeout(() => {
      // Cursor settled: start a fresh segment and reopen near it, as long as the
      // pointer is still over the trigger and no click-dismiss is in effect.
      moveStartRef.current = null
      followCursorHiddenRef.current = false

      if (
        targetHoveredRef.current &&
        !suppressReopenRef.current &&
        !openRef.current &&
        lastMoveEventRef.current
      ) {
        setOpen(true)
        onOpen?.(toReactEvent<ChangeEvent<Element>>(lastMoveEventRef.current))
      }
    }, FOLLOW_CURSOR_STOP_DELAY)
  }

  const handleTriggerMouseLeave = (event: MouseEvent<HTMLElement>) => {
    clearTimeout(openTimerRef.current)
    clearTimeout(stopTimerRef.current)
    targetHoveredRef.current = false
    followCursorHiddenRef.current = false
    moveStartRef.current = null

    // The click-dismiss suppression holds only while the pointer rests on the
    // trigger — leaving lifts it, as the legacy handleMouseLeave cleared
    // `ignoreOpening` (without this, dismiss → leave → re-hover stays stuck
    // closed). One refinement over a bare clear: a rounded trigger also fires
    // `mouseleave` while the pointer merely crosses its transparent corner
    // pixels — visually still "on" the trigger — so the suppression lifts only
    // once the pointer is genuinely outside the trigger's bounding box
    // ("until the mouse leaves the trigger element boundaries").
    const rect = event.currentTarget.getBoundingClientRect()
    const stillWithinBounds =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom

    if (!stillWithinBounds) {
      suppressReopenRef.current = false
    }
  }

  return {
    open: actualOpen,
    handleOpenChange,
    handleOpenChangeComplete,
    handleTriggerClick,
    handleTriggerTouchStart,
    handleTriggerTouchMove,
    handleTriggerTouchEnd,
    handleTriggerMouseOver,
    handleTriggerMouseMove,
    handleTriggerMouseLeave,
  }
}
