import type { MaxWidthType } from './Tooltip'

export const ARROW_GAP = '0.875rem' // 14px
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
  'scale-100 opacity-100 [transform-origin:var(--transform-origin)]',
  'transition-[opacity,scale] duration-200 ease-out',
  'data-[starting-style]:scale-75 data-[starting-style]:opacity-0',
  'data-[ending-style]:scale-75 data-[ending-style]:opacity-0',
  // The literals below MUST match COMPACT_POPUP_MARGIN (`m-1` = 0.25rem) and
  // ARROW_GAP (`0.875rem`) — Tailwind can't interpolate the constants, and
  // utils.ts derives the positioner offsets from them, so drift breaks geometry.
  ...(compact
    ? [
        'shadow-4 bg-graphite-800 text-white leading-none px-2 py-[0.125rem]',
        'm-1',
      ]
    : [
        'shadow-4 bg-white text-graphite-800 p-4',
        // The arrow gap is a positioner `sideOffset`, not a margin, so the
        // popup has one size on every side and a fallback to the other axis
        // cannot make it fit again on its first side. This band covers the
        // gap so a pointer that moves from the anchor into an interactive
        // popup stays over the tooltip
        "before:absolute before:content-['']",
        'data-[side=top]:before:inset-x-0 data-[side=top]:before:top-full data-[side=top]:before:h-[0.875rem]',
        'data-[side=bottom]:before:inset-x-0 data-[side=bottom]:before:bottom-full data-[side=bottom]:before:h-[0.875rem]',
        'data-[side=left]:before:inset-y-0 data-[side=left]:before:left-full data-[side=left]:before:w-[0.875rem]',
        'data-[side=right]:before:inset-y-0 data-[side=right]:before:right-full data-[side=right]:before:w-[0.875rem]',
      ]),
]

// A 45°-rotated square clipped by `overflow-hidden` to a 16px-base, 90°-apex
// triangle. The `0.71rem` (11.36px) size is a deliberate exception to the
// whole-pixel rule: the apex needs a side of 8√2 ≈ 11.314px, so rounding to
// 11/12px visibly moves the tip — don't "fix" it. The arrow carries its own
// box-shadow (not `filter: drop-shadow`) so the shadow survives snapshotting.
export const createArrowClassNames = (): string[] => [
  'box-border overflow-hidden text-white',
  "before:block before:h-full before:w-full before:bg-current before:content-['']",
  'before:[transform:rotate(45deg)]',
  'before:[box-shadow:0_0_0.125rem_0_rgb(0_0_0/0.24),0_0_0.25rem_0_rgb(0_0_0/0.12)]',
  'data-[side=top]:h-[0.71rem] data-[side=top]:w-[1rem]',
  'data-[side=top]:bottom-0 data-[side=top]:mb-[-0.71rem]',
  'data-[side=top]:before:[transform-origin:100%_0]',
  'data-[side=bottom]:h-[0.71rem] data-[side=bottom]:w-[1rem]',
  'data-[side=bottom]:top-0 data-[side=bottom]:mt-[-0.71rem]',
  'data-[side=bottom]:before:[transform-origin:0_100%]',
  'data-[side=left]:h-[1rem] data-[side=left]:w-[0.71rem]',
  'data-[side=left]:right-0 data-[side=left]:mr-[-0.71rem]',
  'data-[side=left]:before:[transform-origin:0_0]',
  'data-[side=right]:h-[1rem] data-[side=right]:w-[0.71rem]',
  'data-[side=right]:left-0 data-[side=right]:ml-[-0.71rem]',
  'data-[side=right]:before:[transform-origin:100%_100%]',
]
