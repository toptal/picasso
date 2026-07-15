import type { Ref } from 'react'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useMultipleForwardRefs } from '@toptal/picasso-utils'

import { getSettledAnchorRect, isMenuItemAnchor } from './utils'

// Wires the tooltip trigger's ref and derives everything the Positioner needs
// from the anchor node: whether it is a menu item (drives anchor-tracking),
// whether it has mounted (gates the enter fade), its portal parent (disablePortal
// mode), and the settled-rect virtual anchor. [PF-2224]
export const useTooltipAnchor = ({
  ref,
  disablePortal,
  followCursor,
}: {
  ref: Ref<HTMLElement>
  disablePortal: boolean
  followCursor: boolean
}) => {
  const [triggerParent, setTriggerParent] = useState<HTMLElement | null>(null)
  const [anchorIsMenuItem, setAnchorIsMenuItem] = useState(false)
  const [triggerMounted, setTriggerMounted] = useState(false)
  const triggerNodeRef = useRef<HTMLElement | null>(null)

  const trackTriggerParent = useCallback(
    (node: HTMLElement | null) => {
      if (disablePortal) {
        setTriggerParent(node?.parentElement ?? null)
      }
    },
    [disablePortal]
  )

  // Mirror the anchor's menu-item-ness into state so `disableAnchorTracking`
  // (on the Positioner) is correct on the render that matters. A `open`-from-mount
  // tooltip (e.g. the Dropdown story) commits its Positioner before the trigger
  // ref callback runs, so a bare `triggerNodeRef.current` read would still be
  // null; the state update re-renders once the node is committed.
  //
  // `triggerMounted` additionally gates the base-ui Root `open` so a tooltip that
  // is `open` from its very first render still plays its enter fade. base-ui's
  // useTransitionStatus initializes `mounted` to `open` and only enters the
  // `'starting'` phase on a false→true transition, so an open-at-mount Root never
  // gets `data-starting-style` and the popup pops in at full opacity. Master (MUI
  // Grow, `appear: true`) faded such tooltips in. The ref callback's setState
  // flushes before paint, so this adds no visible delay. [PF-2224]
  const trackAnchorRole = useCallback((node: HTMLElement | null) => {
    setAnchorIsMenuItem(isMenuItemAnchor(node))
    setTriggerMounted(node !== null)
  }, [])

  const setTriggerRef = useMultipleForwardRefs<HTMLElement | null>([
    ref,
    triggerNodeRef,
    trackTriggerParent,
    trackAnchorRole,
  ])

  // A menu-item anchor sits inside the Dropdown's Paper, which reveals with a
  // ~200ms scale-in — and a mid-scale ancestor taints the anchor's
  // getBoundingClientRect, so base-ui's entrance solve would land the popup ~4px
  // off and it would visibly re-position once the animation settles. This virtual
  // anchor feeds base-ui the anchor's SETTLED rect instead (reconstructed from
  // transform-independent layout metrics, see getSettledAnchorRect), so the first
  // solve already lands on the final position and nothing moves afterwards.
  // `contextElement` keeps floating-ui's ancestorScroll/hide plumbing attached to
  // the real anchor node (autoUpdate and the hide middleware unwrap it), so scroll
  // re-solving and data-[anchor-hidden] behave exactly as with an element anchor.
  // Outside the scale animation the virtual rect IS the live getBoundingClientRect,
  // so steady-state behavior is unchanged. [PF-2224]
  //
  // Because this rect is already the settled position, menu-item anchors also let
  // the caller disable base-ui's resize/layout-shift observers (the Positioner's
  // `disableAnchorTracking`): those would chase late sub-pixel reflows (a web font
  // settling after paint nudges the option row a pixel) and make the popup drift —
  // a jitter master's popper.js never had. Scoped to menu items only; widening it
  // regressed Autocomplete, which has no scale-in but reflows and needs tracking.
  const settledAnchor = useMemo(
    () => ({
      get contextElement() {
        return triggerNodeRef.current ?? undefined
      },
      getBoundingClientRect: () => getSettledAnchorRect(triggerNodeRef.current),
    }),
    []
  )

  // followCursor positions against the cursor (no anchor); a menu item anchors to
  // its settled rect; everything else to the live trigger node.
  const anchor = followCursor
    ? undefined
    : anchorIsMenuItem
    ? settledAnchor
    : triggerNodeRef

  return {
    setTriggerRef,
    triggerNodeRef,
    anchor,
    anchorIsMenuItem,
    triggerMounted,
    triggerParent,
  }
}
