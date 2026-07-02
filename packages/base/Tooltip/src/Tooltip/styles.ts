import type { MaxWidthType } from './Tooltip'

// The anchor↔popup gap, reserved as the popup's own MARGIN — exactly how the
// legacy MUI Tooltip built it: the popper element sat flush against the anchor
// and `.MuiTooltip-tooltipPlacementTop/Bottom { margin: '14px 0' }` (Left/
// Right: `'0 14px'`; Picasso's `compact` override: `margin: '0.25rem'`)
// created the visible gap. Tooltip.tsx keeps the positioner flush by
// subtracting these values from its sideOffset.
//
// Reproducing the margin — rather than pushing a tightly-fitted positioner
// away from the anchor with a plain sideOffset — matters for visual
// regression: Happo sizes a DOM capture to the union of element BORDER boxes
// and does NOT grow it for box-shadows (measured on the Tooltip Cypress
// suite: the MUI capture ended exactly at the popper's border box — popup +
// margin band — never at the shadow extent). The margin makes the positioner's
// border box cover the gap band, so the capture keeps the strip of popup
// shadow that the legacy snapshots show; without it every snapshot is cropped
// flush at the popup edge, ~14px (or 4px compact) short of the baseline.
//
// These constants exist for Tooltip.tsx's sideOffset math — Tailwind can only
// see literal class names, so keep them in sync with the margin classes below.
export const POPUP_MARGIN = '0.875rem' // 14px
export const COMPACT_POPUP_MARGIN = '0.25rem' // 4px

export const createPopupClassNames = (
  compact: boolean,
  maxWidth: MaxWidthType
): string[] => [
  // `font-sans` (proxima-nova) is set explicitly: the popup is portaled, often
  // outside the Picasso root whose `& *` rule supplies the font by inheritance,
  // so without this the text falls back to the browser default serif.
  'relative box-border rounded-sm font-sans',
  maxWidth === 'none' ? 'max-w-none' : 'max-w-[18.75rem]',
  // The dark surface is the base; non-compact tooltips flip to the light surface.
  //
  // BOTH surfaces use the `shadow-4` *box-shadow* (= shadows[4], the legacy
  // tooltip shadow), exactly as the MUI Tooltip did (`boxShadow: shadows[4]` on
  // `.tooltip`) — the popup and the arrow (see createArrowClassNames) each
  // carry their own shadow, so the combined silhouette is the legacy one.
  ...(compact
    ? [
        'shadow-4 bg-graphite-800 text-white leading-none px-2 py-[0.125rem]',
        // Legacy compact margin (`margin: '0.25rem'`, all sides) — the gap
        // band, see COMPACT_POPUP_MARGIN above.
        'm-1',
      ]
    : [
        'shadow-4 bg-white text-graphite-800 p-4',
        // Legacy placement margin — the gap band (see POPUP_MARGIN above),
        // applied on the placement axis of the RESOLVED side so a collision
        // flip keeps the band between the popup and the anchor.
        'data-[side=top]:my-[0.875rem] data-[side=bottom]:my-[0.875rem]',
        'data-[side=left]:mx-[0.875rem] data-[side=right]:mx-[0.875rem]',
      ]),
]

export const createArrowClassNames = (): string[] => [
  // Reproduce the legacy MUI arrow EXACTLY: a `1rem × 0.71rem` (16 × 11.4px)
  // `overflow: hidden` box whose `::before` is a 45°-rotated square tinted with
  // the popup colour and carrying the legacy ARROW_SHADOW
  // (`0 0 2px 0 rgb(0 0 0/.24), 0 0 4px 0 rgb(0 0 0/.12)`). Clipped by
  // overflow-hidden, the visible shape is a 16px-base × 8px-deep triangle with a
  // 90° apex — pixel-matched to master's arrow to 2 device px at 4× zoom.
  // MUI built this arrow in font-relative `em` (pinned at `fontSize: 1rem`); the
  // sizes are expressed here in `rem` instead, which resolves to the identical
  // px (Rule 7 — use `rem` for all sizes).
  // base-ui centres the arrow on the cross axis inline (`left` for top/bottom,
  // `top` for left/right); the per-side negative margin seats it flush against
  // and protruding from the popup edge nearest the anchor, and the per-side
  // `transform-origin` rotates the square about the corner that fills that edge.
  // The arrow carries its OWN box-shadow (as MUI did); paired with the popup's
  // `shadow-4` box-shadow this matches master AND lets Happo capture the shadow
  // band (Happo grows a snapshot bbox for box-shadow, not for filter).
  'box-border overflow-hidden text-white',
  "before:block before:h-full before:w-full before:bg-current before:content-['']",
  'before:[transform:rotate(45deg)]',
  'before:[box-shadow:0_0_0.125rem_0_rgb(0_0_0/0.24),0_0_0.25rem_0_rgb(0_0_0/0.12)]',
  // side=top → popup above the anchor, arrow protrudes down off the bottom edge
  'data-[side=top]:h-[0.71rem] data-[side=top]:w-[1rem]',
  'data-[side=top]:bottom-0 data-[side=top]:mb-[-0.71rem]',
  'data-[side=top]:before:[transform-origin:100%_0]',
  // side=bottom → popup below the anchor, arrow protrudes up off the top edge
  'data-[side=bottom]:h-[0.71rem] data-[side=bottom]:w-[1rem]',
  'data-[side=bottom]:top-0 data-[side=bottom]:mt-[-0.71rem]',
  'data-[side=bottom]:before:[transform-origin:0_100%]',
  // side=left → popup left of the anchor, arrow protrudes right off the right edge
  'data-[side=left]:h-[1rem] data-[side=left]:w-[0.71rem]',
  'data-[side=left]:right-0 data-[side=left]:mr-[-0.71rem]',
  'data-[side=left]:before:[transform-origin:0_0]',
  // side=right → popup right of the anchor, arrow protrudes left off the left edge
  'data-[side=right]:h-[1rem] data-[side=right]:w-[0.71rem]',
  'data-[side=right]:left-0 data-[side=right]:ml-[-0.71rem]',
  'data-[side=right]:before:[transform-origin:100%_100%]',
]
