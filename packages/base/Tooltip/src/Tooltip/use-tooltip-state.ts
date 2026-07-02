import type { ChangeEvent, MouseEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import type { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import { toReactEvent } from '@toptal/picasso-shared'

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
  handleTriggerMouseLeave: () => void
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
  const isControlled = open !== undefined
  const [internalOpen, setInternalOpen] = useState(false)
  const actualOpen = isControlled ? open : internalOpen
  const openRef = useRef(actualOpen)

  openRef.current = actualOpen

  // After a click-to-close, the pointer is still resting on the trigger, so
  // base-ui would immediately re-request open. Suppress that until the pointer
  // leaves (legacy `ignoreOpening` behavior).
  const suppressReopenRef = useRef(false)
  const clearSuppressTimerRef = useRef<ReturnType<typeof setTimeout>>()

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
      clearTimeout(clearSuppressTimerRef.current)
      clearTimeout(stopTimerRef.current)
    },
    []
  )

  const handleOpenChange: BaseTooltip.Root.Props['onOpenChange'] = (
    nextOpen,
    eventDetails
  ) => {
    const reactEvent = toReactEvent<ChangeEvent<Element>>(eventDetails.event)

    if (nextOpen) {
      onOpen?.(reactEvent)
    } else {
      onClose?.(reactEvent)
    }

    if (isControlled) {
      return
    }

    if (!nextOpen) {
      setInternalOpen(false)
      // base-ui emits rapid close→open churn as the pointer crosses the
      // trigger's rounded corners, so the dismiss-suppression must NOT lift on
      // a bare `close`. Schedule lifting it, but cancel that below on any
      // subsequent `open` request — so suppression only lifts once the pointer
      // has genuinely settled away from the trigger (no re-open follows).
      if (suppressReopenRef.current) {
        clearTimeout(clearSuppressTimerRef.current)
        clearSuppressTimerRef.current = setTimeout(() => {
          suppressReopenRef.current = false
        }, 600)
      }
    } else {
      clearTimeout(clearSuppressTimerRef.current)
      if (!suppressReopenRef.current && !followCursorHiddenRef.current) {
        setInternalOpen(true)
      }
    }
  }

  const handleTriggerClick = (event: MouseEvent<HTMLElement>) => {
    if (isControlled || disableListeners) {
      return
    }

    if (openRef.current) {
      clearTimeout(clearSuppressTimerRef.current)
      suppressReopenRef.current = true
      setInternalOpen(false)
      onClose?.(toReactEvent<ChangeEvent<Element>>(event.nativeEvent))
    } else {
      setInternalOpen(true)
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
      suppressReopenRef.current ||
      openRef.current
    ) {
      return
    }

    const { nativeEvent } = event

    clearTimeout(openTimerRef.current)
    openTimerRef.current = setTimeout(() => {
      // base-ui's own hover path may have opened it first within the delay; if so
      // it already fired `onOpen`, so don't double-fire.
      if (openRef.current) {
        return
      }

      setInternalOpen(true)
      onOpen?.(toReactEvent<ChangeEvent<Element>>(nativeEvent))
    }, openDelay)
  }

  // followCursor only: hide while the pointer roams far from where the tooltip
  // opened, and reopen once it settles — base-ui's cursor tracking repositions
  // but never hides, which leaves the popup lingering under a distant cursor.
  const handleTriggerMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (isControlled || disableListeners || !followCursor) {
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
      setInternalOpen(false)
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
        setInternalOpen(true)
        onOpen?.(toReactEvent<ChangeEvent<Element>>(lastMoveEventRef.current))
      }
    }, FOLLOW_CURSOR_STOP_DELAY)
  }

  const handleTriggerMouseLeave = () => {
    clearTimeout(openTimerRef.current)
    clearTimeout(stopTimerRef.current)
    targetHoveredRef.current = false
    followCursorHiddenRef.current = false
    moveStartRef.current = null
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
