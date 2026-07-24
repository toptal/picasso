import type { Ref } from 'react'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useMultipleForwardRefs } from '@toptal/picasso-utils'

import { getSettledAnchorRect, isMenuItemAnchor } from './utils'

// Wires the tooltip trigger's ref and derives everything the positioner needs
// from the anchor node: whether it is a menu item (drives anchor-tracking),
// whether it has mounted (gates the enter fade), its portal parent (disablePortal
// mode), and the settled-rect virtual anchor.
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

  // Mirror the anchor's menu-item-ness into state so `disableAnchorTracking` is
  // correct on the render that matters. An `open`-from-mount tooltip commits its
  // positioner before the trigger ref callback runs, so a bare
  // `triggerNodeRef.current` read would still be null; the state update
  // re-renders once the node is committed.
  //
  // `triggerMounted` additionally gates the Root `open` so a tooltip that is
  // `open` from its very first render still plays its enter fade: the transition
  // only starts on a false→true change, so an open-at-mount popup would otherwise
  // appear at full opacity. The ref callback's setState flushes before paint, so
  // this adds no visible delay.
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
  // getBoundingClientRect, so the entrance solve would land the popup ~4px off
  // and it would visibly re-position once the animation settles. This virtual
  // anchor feeds the anchor's SETTLED rect instead (reconstructed from
  // transform-independent layout metrics, see getSettledAnchorRect), so the first
  // solve already lands on the final position and nothing moves afterwards.
  // `contextElement` keeps the scroll/hide plumbing attached to the real anchor
  // node, so scroll re-solving and data-[anchor-hidden] behave exactly as with an
  // element anchor. Outside the scale animation the virtual rect IS the live
  // getBoundingClientRect, so steady-state behavior is unchanged.
  //
  // Because this rect is already the settled position, menu-item anchors also
  // disable the resize/layout-shift observers (`disableAnchorTracking`): those
  // would chase late sub-pixel reflows (a web font settling after paint nudges
  // the option row a pixel) and make the popup drift. Scoped to menu items only —
  // other anchors (e.g. Autocomplete) reflow and need tracking.
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
