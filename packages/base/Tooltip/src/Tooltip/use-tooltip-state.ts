import type { ChangeEvent, MouseEvent, TouchEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import type { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import { toReactEvent } from '@toptal/picasso-shared'
import {
  isPointerDevice,
  isPointerModality,
  subscribePointerModality,
  unsubscribePointerModality,
} from '@toptal/picasso-utils'

import { shouldHonorOpen } from './should-honor-open'

const FOLLOW_CURSOR_CLOSE_DISTANCE = 50
const FOLLOW_CURSOR_STOP_DELAY = 250

// Tap-vs-scroll discrimination for the touch-open path: a touch gesture that
// travels more than this many px from where it started is a scroll/swipe, not
// a tap, and must not open the tooltip (see handleTriggerTouchMove). 10px is
// the conventional tap slop used by mobile toolkits to tell taps from drags.
const TOUCH_TAP_SLOP = 10

interface UseTooltipStateOptions {
  open?: boolean
  disableListeners?: boolean
  followCursor?: boolean
  // Delay (ms) before a hover opens the tooltip.
  openDelay: number
  onOpen?: (event: ChangeEvent<{}>) => void
  onClose?: (event: ChangeEvent<{}>) => void
  // Fires as the close transition starts / finishes respectively.
  onTransitionExiting?: () => void
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

export const useTooltipState = ({
  open,
  disableListeners,
  followCursor,
  openDelay,
  onOpen,
  onClose,
  onTransitionExiting,
  onTransitionExited,
}: UseTooltipStateOptions): TooltipState => {
  const isTouchDevice = !isPointerDevice()
  const followCursorUnsupported = Boolean(followCursor) && isTouchDevice

  const isControlled = open !== undefined
  const [internalOpen, setInternalOpen] = useState(false)
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

  const suppressReopenRef = useRef(false)

  // Pending hover-open timer (see handleTriggerMouseOver). A non-undefined
  // value doubles as "a hover-open is still pending": the callback nulls it
  // when it fires and every cancel path (click-dismiss, mouseleave, unmount)
  // nulls it too, so `openTimerRef.current !== undefined` reliably means the
  // enter-delay is still counting down. handleTriggerClick relies on that — a
  // click landing in this window belongs to the same gesture as the hover, so
  // it must not read base-ui's transient focus-open from that same gesture and
  // dismiss-then-latch it shut. Let hover win, as the pre-v2 build did (its
  // click read lagging closure state and was a desktop no-op). [PF-2245]
  // (Why base-ui opens on that mousedown-focus at all is environment lore —
  // see the pointer-modality util doc and ADR-20.)
  const openTimerRef = useRef<ReturnType<typeof setTimeout>>()

  const touchOpenedRef = useRef(false)

  // Where the current touch gesture began; null means "no pending tap-open"
  // (handleTriggerTouchMove nulls it once the finger scrolls past the slop).
  const touchStartPositionRef = useRef<Point | null>(null)

  const moveStartRef = useRef<{ x: number; y: number } | null>(null)
  const followCursorHiddenRef = useRef(false)
  const stopTimerRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    // Input-modality tracking feeds the pointer-focus veto in shouldHonorOpen
    // (see the pointer-modality util doc for why `:focus-visible` alone can't
    // make that call). [PF-2253]
    subscribePointerModality()

    return () => {
      unsubscribePointerModality()
      clearTimeout(openTimerRef.current)
      clearTimeout(stopTimerRef.current)
    }
  }, [])

  // Fire onTransitionExiting when the close transition BEGINS (open flips
  // true→false), mirroring MUI's Grow `onExiting`; onTransitionExited then
  // fires when it FINISHES (handleOpenChangeComplete below). Driving the start
  // off `actualOpen` catches both interaction-driven and controlled closes.
  // A consumer (e.g. TypographyOverflow) relies on the gap between the two to
  // keep the popup rendered for the duration of the exit animation — firing
  // both together at the end would collapse that window. [PF-2224]
  const wasOpenRef = useRef(actualOpen)

  useEffect(() => {
    if (wasOpenRef.current && !actualOpen) {
      onTransitionExiting?.()
    }

    wasOpenRef.current = Boolean(actualOpen)
  }, [actualOpen, onTransitionExiting])

  const handleOpenChange: BaseTooltip.Root.Props['onOpenChange'] = (
    nextOpen,
    eventDetails
  ) => {
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

    // Picasso decides which open requests to honor — the whole veto set lives
    // in shouldHonorOpen's truth table. Runs BEFORE the controlled/
    // uncontrolled split, but the arbiter keeps the hover/latch/roam vetoes
    // uncontrolled-only (a controlled tooltip's only hover-open is base-ui's
    // forwarded `trigger-hover` → onOpen); only the pointer-focus veto newly
    // applies to controlled mode. Keyboard focus-open stays honored for a11y.
    // [PF-2253]
    if (
      !shouldHonorOpen({
        reason: eventDetails.reason,
        isControlled,
        suppressReopen: suppressReopenRef.current,
        followCursorHidden: followCursorHiddenRef.current,
        followCursorUnsupported,
        isPointerModality: isPointerModality(),
      })
    ) {
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
      // A hover-open is still in flight: this "open" is base-ui's transient
      // focus-open coexisting with the same gesture (now a keyboard-focus-open,
      // since row 5 vetoes pointer-focus — still reachable where a focus fires
      // without a preceding pointerdown), not a deliberately shown tooltip —
      // don't dismiss-and-latch it. Leave the pending timer to open it for real
      // (its callback no-ops if base-ui already did). [PF-2245]
      if (openTimerRef.current !== undefined) {
        return
      }

      suppressReopenRef.current = true
      clearTimeout(openTimerRef.current)
      openTimerRef.current = undefined
      setOpen(false)
      onClose?.(toReactEvent<ChangeEvent<Element>>(event.nativeEvent))
    } else if (
      isTouchDevice &&
      !followCursorUnsupported &&
      !suppressReopenRef.current
    ) {
      setOpen(true)
      onOpen?.(toReactEvent<ChangeEvent<Element>>(event.nativeEvent))
    }
  }

  // Tap-to-open is the ONLY open path for a disabled control wrapped in a
  // `<span>` trigger: the HTML spec bars disabled form controls from firing
  // `click`, but touch events still bubble to the trigger. Arm here, open on
  // touchend (touchmove past the slop disarms a scroll/swipe).
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
      onTransitionExited?.()
    }
  }

  const handleTriggerMouseOver = (event: MouseEvent<HTMLElement>) => {
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
      // Retire the pending marker first — the hover-open window is over, so a
      // subsequent click must be free to dismiss again (must precede the early
      // return below). [PF-2245]
      openTimerRef.current = undefined

      if (openRef.current || suppressReopenRef.current) {
        return
      }

      setOpen(true)
      onOpen?.(toReactEvent<ChangeEvent<Element>>(nativeEvent))
    }, openDelay)
  }

  const handleTriggerMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (isControlled || disableListeners || !followCursor || isTouchDevice) {
      return
    }

    const position = { x: event.clientX, y: event.clientY }
    const { nativeEvent } = event

    moveStartRef.current ??= position

    const movedTooFar =
      Math.abs(position.x - moveStartRef.current.x) >
        FOLLOW_CURSOR_CLOSE_DISTANCE ||
      Math.abs(position.y - moveStartRef.current.y) >
        FOLLOW_CURSOR_CLOSE_DISTANCE

    if (movedTooFar && openRef.current) {
      followCursorHiddenRef.current = true
      setOpen(false)
      onClose?.(toReactEvent<ChangeEvent<Element>>(nativeEvent))
    }

    clearTimeout(stopTimerRef.current)
    stopTimerRef.current = setTimeout(() => {
      // Cursor settled: start a fresh segment and reopen near it, as long as no
      // click-dismiss is in effect. The stop timer is re-armed on every move
      // and cleared on mouseleave, so this only fires while the pointer is
      // still over the trigger, and `nativeEvent` is that last move's event.
      moveStartRef.current = null
      followCursorHiddenRef.current = false

      if (!suppressReopenRef.current && !openRef.current) {
        setOpen(true)
        onOpen?.(toReactEvent<ChangeEvent<Element>>(nativeEvent))
      }
    }, FOLLOW_CURSOR_STOP_DELAY)
  }

  const handleTriggerMouseLeave = (event: MouseEvent<HTMLElement>) => {
    clearTimeout(openTimerRef.current)
    clearTimeout(stopTimerRef.current)
    openTimerRef.current = undefined
    followCursorHiddenRef.current = false
    moveStartRef.current = null

    // A rounded trigger fires `mouseleave` while the pointer merely crosses its
    // transparent corner pixels — visually still "on" the trigger — so lift the
    // click-dismiss suppression only once the pointer is genuinely outside the
    // trigger's bounding box.
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
