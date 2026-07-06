import type { ChangeEvent, MouseEvent } from 'react'
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
  handleTriggerMouseOver: (event: MouseEvent<HTMLElement>) => void
  handleTriggerMouseMove: (event: MouseEvent<HTMLElement>) => void
  handleTriggerMouseLeave: (event: MouseEvent<HTMLElement>) => void
}

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
    handleTriggerMouseOver,
    handleTriggerMouseMove,
    handleTriggerMouseLeave,
  }
}
