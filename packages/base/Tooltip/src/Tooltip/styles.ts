import type { MaxWidthType } from './Tooltip'

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
  // `.tooltip`). This is deliberate on two counts:
  //
  // • It reproduces master pixel-for-pixel — master IS the MUI build, whose
  //   popup carried `shadow-4` and whose arrow carried its OWN shadow (see
  //   createArrowClassNames). The combined silhouette is the legacy one.
  //
  // • Happo's DOM capture grows a snapshot's bbox to include a `box-shadow` but
  //   NOT a `filter: drop-shadow`. A drop-shadow here rendered the non-compact
  //   snapshots ~21px short (the shadow band below the popup was cropped),
  //   whereas the `compact` box-shadow cropped only ~4px. box-shadow keeps the
  //   capture aligned with the legacy snapshot.
  ...(compact
    ? ['shadow-4 bg-graphite-800 text-white leading-none px-2 py-[0.125rem]']
    : ['shadow-4 bg-white text-graphite-800 p-4']),
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
