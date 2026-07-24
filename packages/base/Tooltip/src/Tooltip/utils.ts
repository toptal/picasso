import type { RefObject } from 'react'
import { fromPx, pxFromRem, spacingToRem } from '@toptal/picasso-shared'
import type { PicassoSpacing } from '@toptal/picasso-provider'
import { SPACING_0 } from '@toptal/picasso-provider'

import { COMPACT_POPUP_MARGIN, POPUP_MARGIN } from './styles'
import type { OffsetType, PlacementType } from './Tooltip'

type Side = 'top' | 'bottom' | 'left' | 'right'
type Align = 'start' | 'center' | 'end'

const remToPx = (remValue: string): number => fromPx(pxFromRem(remValue))

const POPUP_MARGIN_PX = remToPx(POPUP_MARGIN) // 14px
const COMPACT_POPUP_MARGIN_PX = remToPx(COMPACT_POPUP_MARGIN) // 4px

// Menu-item tooltips sit in a dense stack of options where a menu item's box
// includes top padding, so the standard flush gap lands the arrow tip in that
// padding — the dead strip above the option — and reads as pointing between
// rows. Pull the popup ~7px closer (gap 7px vs the 14px margin band) so the tip
// seats ~4px into the option's box, touching the option it describes without
// sinking into it. Scoped to menu items only — every other anchor keeps the
// standard gap. Calibrated against the option's SETTLED rect, which is also the
// rect the entrance solve positions against (see getSettledAnchorRect below),
// so the gap is correct from the first paint.
const MENU_ITEM_ARROW_GAP = remToPx('0.4375rem') // 7px
const FOLLOW_CURSOR_GAP = remToPx('0.625rem') // 10px

// Menu items are recognized by the anchor's semantic (ARIA) role rather than
// by coupling to @toptal/picasso-menu — Menu.Item renders `role="menuitem"`,
// while look-alikes that must keep the standard gap don't (e.g. Autocomplete
// options render inside a Menu but as `role="option"`).
export const isMenuItemAnchor = (anchor: Element | null): boolean =>
  anchor?.getAttribute('role') === 'menuitem'

// `getComputedStyle().scale` serializes as 'none' | '<x>' | '<x> <y>'
// (a '<x> <y> <z>' third component only appears for scale3d, where a
// non-identity z still implies x/y are worth checking).
const parseScalePair = (value: string): { x: number; y: number } | null => {
  if (!value || value === 'none') {
    return null
  }

  const parts = value.split(' ')
  const scaleX = parseFloat(parts[0])
  const scaleY = parts.length > 1 ? parseFloat(parts[1]) : scaleX

  if (Number.isNaN(scaleX) || Number.isNaN(scaleY)) {
    return null
  }

  return { x: scaleX, y: scaleY }
}

// True while the element is scaled away from identity — via the standalone
// `scale` property (what Tailwind v4's `scale-*` sets, and what the Dropdown's
// Paper animates) or via a `transform` whose matrix has non-1 scale components.
// A pure translate (`matrix(1, 0, 0, 1, x, y)`) is NOT a taint: it moves boxes
// without distorting them, and getBoundingClientRect reports it faithfully.
const hasNonIdentityScale = (element: Element): boolean => {
  const computed = getComputedStyle(element)
  const scale = parseScalePair(computed.scale)

  if (scale && (scale.x !== 1 || scale.y !== 1)) {
    return true
  }

  const { transform } = computed

  if (!transform || transform === 'none') {
    return false
  }

  const matrix = transform.match(/^matrix(?:3d)?\(([^)]+)\)$/)

  if (!matrix) {
    return false
  }

  const components = matrix[1].split(',').map(Number)
  // matrix(a, b, c, d, e, f): a/d are the x/y scale components.
  // matrix3d(m11, …, m44): m11 (index 0) and m22 (index 5) are x/y scale.
  const [scaleX, scaleY] =
    components.length === 16
      ? [components[0], components[5]]
      : [components[0], components[3]]

  return scaleX !== 1 || scaleY !== 1
}

const findScaleTaintedAncestor = (element: Element): HTMLElement | null => {
  let node = element.parentElement

  while (node) {
    if (hasNonIdentityScale(node)) {
      return node
    }

    node = node.parentElement
  }

  return null
}

// Distinguishes a mid-reveal transform (the Dropdown's scale-in — its rect is
// transient) from a STATIC, deliberate one (an app-level `zoom`/`scale` wrapper,
// an embedded preview — a stable rect). Only a running transition/animation
// warrants reconstructing the settled rect; otherwise the live rect is already
// correct. `getAnimations` is absent under SSR/jsdom, where we assume
// "animating" so the reconstruction path still runs.
type Animatable = { getAnimations?: () => unknown[] }

const isAnimating = (target: Animatable): boolean =>
  typeof target.getAnimations !== 'function' ||
  target.getAnimations().length > 0

// Accumulates the element's layout offset (border-box origin) relative to
// `root`'s border-box origin, walking the offsetParent chain.
// offsetTop/offsetLeft are LAYOUT metrics — CSS transforms never affect them —
// which is the whole point: the result is the element's position as if every
// transform between it and `root` were identity. Returns null when `root` is
// not on the element's offsetParent chain (caller falls back to live rects).
const getLayoutOffsetWithin = (
  element: HTMLElement,
  root: HTMLElement
): { left: number; top: number } | null => {
  let left = 0
  let top = 0
  let node: HTMLElement = element

  while (node !== root) {
    left += node.offsetLeft
    top += node.offsetTop

    const { offsetParent } = node

    if (!(offsetParent instanceof HTMLElement)) {
      return null
    }

    // offsetTop/offsetLeft are relative to the offsetParent's padding edge;
    // clientTop/clientLeft (its border widths) convert to border-box relative.
    left += offsetParent.clientLeft
    top += offsetParent.clientTop

    // Scroll positions DO shift the rendered box without changing offsetTop,
    // so subtract the scroll of every ancestor up to the offsetParent.
    let scroller = node.parentElement

    while (scroller) {
      left -= scroller.scrollLeft
      top -= scroller.scrollTop

      if (scroller === offsetParent) {
        break
      }

      scroller = scroller.parentElement
    }

    node = offsetParent
  }

  return { left, top }
}

// The rect shape floating-ui expects from a virtual anchor
// (its ClientRectObject) — structurally a subset of DOMRect, so the
// plain-getBoundingClientRect path below satisfies it too.
export type AnchorRect = {
  x: number
  y: number
  width: number
  height: number
  top: number
  right: number
  bottom: number
  left: number
}

const makeRect = ({
  left,
  top,
  width,
  height,
}: {
  left: number
  top: number
  width: number
  height: number
}): AnchorRect => ({
  x: left,
  y: top,
  width,
  height,
  top,
  left,
  right: left + width,
  bottom: top + height,
})

// The anchor's viewport rect with any ancestor scale animation factored OUT —
// i.e. the rect the anchor will occupy once the animation settles.
//
// Why: the tooltip is positioned on its very first paint, and when the anchor
// is a Menu.Item inside a Dropdown, that happens WHILE the Dropdown's Paper is
// still playing its ~200ms scale-in. A mid-scale ancestor taints the anchor's
// getBoundingClientRect, so the entrance solve lands ~4px off and the tooltip
// visibly re-positions once the settled geometry is measured. This helper makes
// the FIRST solve land on the final position instead: it finds the nearest
// scale-animating ancestor, takes that ancestor's offsetParent (whose own rect
// is transform-clean) as a trustworthy origin, and reconstructs the anchor's
// rect from pure layout metrics (offsetTop/offsetLeft chain +
// offsetWidth/offsetHeight), which CSS transforms cannot touch. The result is
// CONSTANT for the whole animation and exactly equals the settled rect, so there
// is nothing left to jump.
//
// Reconstruction is gated on a transform being ANIMATING (getAnimations): a
// scaled ancestor that is not animating is deliberate, persistent geometry (an
// app-level zoom, an embedded preview), whose live rect is already correct. So
// this returns the live getBoundingClientRect unchanged both in the steady state
// (no scaled ancestor) and against a static transform.
export const getSettledAnchorRect = (
  anchor: HTMLElement | null
): AnchorRect => {
  if (!anchor) {
    return makeRect({ left: 0, top: 0, width: 0, height: 0 })
  }

  // Steady-state fast path: this runs on every scroll re-solve while the tooltip
  // is open, so when nothing in the document is animating — the common case — no
  // ancestor can be mid-reveal and we skip the ancestor walk entirely.
  if (!isAnimating(document)) {
    return anchor.getBoundingClientRect()
  }

  const taintedAncestor = findScaleTaintedAncestor(anchor)

  if (!taintedAncestor) {
    return anchor.getBoundingClientRect()
  }

  // A scaled ancestor that is NOT animating carries a deliberate, persistent
  // transform (not the Dropdown's scale-in), so its live rect is the real one —
  // reconstruct only while it is actually mid-animation.
  if (!isAnimating(taintedAncestor)) {
    return anchor.getBoundingClientRect()
  }

  const { offsetParent: root } = taintedAncestor

  if (!(root instanceof HTMLElement)) {
    return anchor.getBoundingClientRect()
  }

  const layoutOffset = getLayoutOffsetWithin(anchor, root)

  if (!layoutOffset) {
    return anchor.getBoundingClientRect()
  }

  // Recurse for the root's own origin so a (theoretical) outer scale animation
  // above the root is factored out the same way; the recursion bottoms out at
  // the first transform-clean level with a plain getBoundingClientRect.
  const rootRect = getSettledAnchorRect(root)

  return makeRect({
    left: rootRect.left + layoutOffset.left,
    top: rootRect.top + layoutOffset.top,
    width: anchor.offsetWidth,
    height: anchor.offsetHeight,
  })
}

export const spacingToPxNumber = (spacing: PicassoSpacing): number =>
  remToPx(spacingToRem(spacing))

export const splitPlacement = (
  placement: PlacementType
): { side: Side; align: Align } => {
  const [side, alignPart] = placement.split('-') as [Side, string | undefined]

  const align: Align =
    alignPart === 'start' || alignPart === 'end' ? alignPart : 'center'

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

  // A single, flip-invariant gap: the offset is applied as a constant user
  // offset that never varies by resolved side, so the anchor↔popup gap is
  // identical whether or not the popup flips.
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
