import type { ChangeEvent, MouseEvent, TouchEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import type { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import { toReactEvent } from '@toptal/picasso-shared'
import { isPointerDevice } from '@toptal/picasso-utils'

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

  // Pending hover-open timer (see handleTriggerMouseOver).
  const openTimerRef = useRef<ReturnType<typeof setTimeout>>()

  const touchOpenedRef = useRef(false)

  // Where the current touch gesture began; null means "no pending tap-open"
  // (handleTriggerTouchMove nulls it once the finger scrolls past the slop).
  const touchStartPositionRef = useRef<Point | null>(null)

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
      onTransitionExiting?.()
      onTransitionExited?.()
    }
  }

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
