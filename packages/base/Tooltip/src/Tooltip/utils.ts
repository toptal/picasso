import type { RefObject } from 'react'
import { fromPx, pxFromRem, spacingToRem } from '@toptal/picasso-shared'
import type { PicassoSpacing } from '@toptal/picasso-provider'
import { SPACING_0 } from '@toptal/picasso-provider'

import { COMPACT_POPUP_MARGIN, POPUP_MARGIN } from './styles'
import type { OffsetType, PlacementType } from './Tooltip'

type Side = 'top' | 'bottom' | 'left' | 'right'
type Align = 'start' | 'center' | 'end'

const gapPx = (remValue: string): number => fromPx(pxFromRem(remValue))

const POPUP_MARGIN_PX = gapPx(POPUP_MARGIN) // 14px
const COMPACT_POPUP_MARGIN_PX = gapPx(COMPACT_POPUP_MARGIN) // 4px

// Menu-item tooltips sit in a dense stack of options where a menu item's box
// includes top padding, so the standard flush gap lands the arrow tip in that
// padding — the dead strip above the option — and reads as pointing between
// rows. Pull the popup ~7px closer (gap 7px vs the 14px margin band) so the tip
// seats ~4px into the option's box, touching the option it describes without
// sinking into it. Scoped to menu items only — every other anchor keeps the
// standard gap. Calibrated against the option's SETTLED rect: a Dropdown reveals
// its menu with a scale-in animation, and a CSS transform taints an anchor's
// getBoundingClientRect while it plays, so the tooltip's first measurement lands
// ~4px off; Dropdown re-nudges the tooltip to the true position when that
// animation finishes (Dropdown.tsx onTransitionEnd). [PF-1994][PF-2224]
const MENU_ITEM_ARROW_GAP = gapPx('0.4375rem') // 7px
const FOLLOW_CURSOR_GAP = gapPx('0.625rem') // 10px

// Menu items are recognized by the anchor's semantic (ARIA) role rather than
// by coupling to @toptal/picasso-menu — Menu.Item renders `role="menuitem"`,
// while look-alikes that must keep the standard gap don't (e.g. Autocomplete
// options render inside a Menu but as `role="option"`).
export const isMenuItemAnchor = (anchor: Element | null): boolean =>
  anchor?.getAttribute('role') === 'menuitem'

export const spacingToPxNumber = (spacing: PicassoSpacing): number =>
  fromPx(pxFromRem(spacingToRem(spacing)))

export const splitPlacement = (
  placement: PlacementType
): { side: Side; align: Align } => {
  const [side, alignPart] = placement.split('-') as [Side, string | undefined]

  const align: Align =
    alignPart === 'start' ? 'start' : alignPart === 'end' ? 'end' : 'center'

  return { side, align }
}

export const getPositionerOffsets = ({
  side,
  showArrow,
  followCursor,
  compact,
  offset,
  anchorRef,
}: {
  side: Side
  showArrow: boolean
  followCursor: boolean
  compact: boolean
  offset: OffsetType
  anchorRef: RefObject<HTMLElement | null>
}): { sideOffset: number | (() => number); alignOffset: number } => {
  // followCursor positions against the cursor with its own fixed distance;
  // the public `offset` prop only applies to anchor-relative placement. The
  // popup's own margin (styles.ts) already provides that much of the gap, so
  // the sideOffset supplies only the remainder.
  if (followCursor) {
    const popupMargin = compact ? COMPACT_POPUP_MARGIN_PX : POPUP_MARGIN_PX

    return { sideOffset: FOLLOW_CURSOR_GAP - popupMargin, alignOffset: 0 }
  }

  const isVertical = side === 'top' || side === 'bottom'
  const offsetLeft = spacingToPxNumber(offset.left ?? SPACING_0)
  const offsetTop = spacingToPxNumber(offset.top ?? SPACING_0)

  // A single, flip-invariant gap, as MUI's Popper applied it: the `offset`
  // modifier carried only the user offset and never varied by resolved side, so
  // the anchor↔popup gap is identical whether or not floating-ui flips.
  const userSideOffset = isVertical ? offsetTop : offsetLeft
  const alignOffset = isVertical ? offsetLeft : offsetTop

  // No arrow here means compact (followCursor returned above), and the
  // compact gap IS the compact popup margin (`m-1`, the reserved gap band in
  // styles.ts) — the positioner sits flush and only the user offset remains.
  if (!showArrow) {
    return { sideOffset: userSideOffset, alignOffset }
  }

  // Only a menu-item anchor shifts the arrow gap, pulling the popup back by the
  // difference. The gap depends on what the arrow points at (see
  // MENU_ITEM_ARROW_GAP), so it resolves lazily via an offset function called at
  // position time, when the anchor node is already committed — keeping the first
  // paint correct without tracking the anchor in state.
  return {
    sideOffset: () =>
      (isMenuItemAnchor(anchorRef.current)
        ? MENU_ITEM_ARROW_GAP - POPUP_MARGIN_PX
        : 0) + userSideOffset,
    alignOffset,
  }
}
