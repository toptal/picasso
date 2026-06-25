export type Borders = 'all' | 'middle' | 'none'

const separatorBeforeClasses = [
  'before:content-[""]',
  'before:absolute',
  'before:left-0',
  'before:right-0',
  'before:h-[1px]',
  'before:bg-gray-400',
]

// The legacy JSS ::after had no top/bottom, so its absolute static position
// sat 1px BELOW the box edge (overlapping the next sibling's first row).
// -bottom-[1px] reproduces that exact placement.
const separatorAfterClasses = [
  'after:content-[""]',
  'after:absolute',
  'after:left-0',
  'after:right-0',
  'after:-bottom-[1px]',
  'after:h-[1px]',
  'after:bg-gray-400',
]

const createBorderClassNames = (borders: Borders): string[] => {
  switch (borders) {
    case 'all':
      return [
        ...separatorBeforeClasses,
        'before:-top-[1px]',
        ...separatorAfterClasses,
        // An accordion directly preceded by another accordion hides its own
        // top separator — the previous sibling's bottom separator already
        // draws the same line
        '[[data-component-type="accordion"]+&]:before:hidden',
      ]
    case 'middle':
      return [
        ...separatorBeforeClasses,
        'before:top-0',
        'before:hidden',
        // The middle separator only shows between two stacked accordions
        '[[data-component-type="accordion"]+&]:before:block',
      ]
    case 'none':
      return []
  }
}

export const createRootClassNames = (borders: Borders): string[] => [
  'relative',
  'bg-transparent',
  'text-[1rem]',
  'text-graphite-700',
  ...createBorderClassNames(borders),
]

export const createExpandIconClassNames = (expanded: boolean): string[] => {
  const classNames = [
    'text-[0.7em]',
    'text-graphite-700',
    'transition-transform',
    'duration-150',
    'ease-in-out',
  ]

  if (expanded) {
    classNames.push('rotate-180')
  }

  return classNames
}

export const expandIconAlignTopClasses = [
  'flex',
  'items-center',
  'h-[1.5em]',
  'self-start',
]

export const panelClasses = [
  'overflow-hidden',
  'h-[var(--accordion-panel-height)]',
  'transition-[height]',
  // Duration is driven by `--accordion-duration` (set from `transitionProps.timeout`),
  // falling back to a fixed 300ms that approximates the legacy `timeout: 'auto'`.
  'duration-[var(--accordion-duration)]',
  'ease-in-out',
  'data-starting-style:h-0',
  'data-ending-style:h-0',
  // When collapsed, Base UI sets the native `hidden` attribute (display:none)
  // on the panel, dropping its wider content out of layout — which lets a
  // flex-item Accordion shrink to its summary width. Keep the panel in the
  // layout flow so it still contributes width, while staying hidden:
  //   block      — undo display:none so the box participates in sizing again
  //   h-0        — Base UI's --accordion-panel-height resolves to `auto` once
  //                hidden, so re-displaying needs an explicit 0 to stay collapsed
  //   invisible  — drop the re-displayed content from the a11y tree / tab order
  '[&[hidden]]:block',
  '[&[hidden]]:h-0',
  '[&[hidden]]:invisible',
]

export const summaryWrapperClasses = ['text-black']

export const detailsWrapperClasses = [
  'text-[0.875em]',
  'font-regular',
  'leading-[1.5em]',
  'mb-[0.75em]',
  'text-graphite-800',
]
