import type { RefObject } from 'react'
import { fromPx, pxFromRem, spacingToRem } from '@toptal/picasso-shared'
import type { PicassoSpacing } from '@toptal/picasso-provider'
import { SPACING_0 } from '@toptal/picasso-provider'

import { COMPACT_POPUP_MARGIN, POPUP_MARGIN } from './styles'
import type { OffsetType, PlacementType } from './Tooltip'

type Side = 'top' | 'bottom' | 'left' | 'right'
type Align = 'start' | 'center' | 'end'

// Anchor↔popup gaps along the side axis. base-ui's positioner works in pixels,
// so these are expressed in `rem` (Rule 7 — sizes scale with the root font, as
// the rem-sized arrow in styles.ts does) and resolved to the px number it needs.
const gapPx = (remValue: string): number => fromPx(pxFromRem(remValue))

// The gap band that styles.ts reserves as the popup's own margin (the legacy
// MUI geometry — see POPUP_MARGIN there). The positioner sits flush against
// the anchor exactly as MUI's popper did (sideOffset carries only what the
// margin band doesn't: getPositionerOffsets), and the margin IS the standard
// anchor↔popup gap — both the default arrow gap and the compact gap equal
// their popup margin by construction.
const POPUP_MARGIN_PX = gapPx(POPUP_MARGIN) // 14px
const COMPACT_POPUP_MARGIN_PX = gapPx(COMPACT_POPUP_MARGIN) // 4px

// Menu-item tooltips sit in a dense stack of options, where the standard
// arrow gap (= POPUP_MARGIN_PX, the margin band) lands the arrow tip in the
// dead strip between two rows and reads as pointing at the wrong option. Per
// design, the tip↔anchor gap on menu items is 0-4px (not ~8px), so a
// menu-item anchor uses a tighter gap that seats the arrow on the option it
// describes. Scoped to menu items only — every other anchor keeps the
// standard gap. [PF-1994]
const MENU_ITEM_ARROW_GAP = gapPx('0.5rem') // 8px
const FOLLOW_CURSOR_GAP = gapPx('0.625rem') // 10px

// Menu items are recognized by the anchor's semantic (ARIA) role rather than
// by coupling to @toptal/picasso-menu — Menu.Item renders `role="menuitem"`,
// while look-alikes that must keep the standard gap don't (e.g. Autocomplete
// options render inside a Menu but as `role="option"`).
const isMenuItemAnchor = (anchor: Element | null): boolean =>
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

  // Arrow tooltips: the standard arrow gap IS the popup margin band
  // (my-/mx-[0.875rem] — MUI reserved the gap as the tooltip's own
  // `margin: '14px 0'`), so the positioner again sits flush; only a
  // menu-item anchor shifts, its tighter seat pulling the popup back by the
  // difference. The gap depends on what the arrow points at (see
  // MENU_ITEM_ARROW_GAP), so it resolves lazily — base-ui calls an offset
  // function at position time, when the anchor node is already committed.
  // This keeps the first paint correct without tracking the anchor in state
  // (no extra render + reposition pass).
  return {
    sideOffset: () =>
      (isMenuItemAnchor(anchorRef.current)
        ? MENU_ITEM_ARROW_GAP - POPUP_MARGIN_PX
        : 0) + userSideOffset,
    alignOffset,
  }
}
