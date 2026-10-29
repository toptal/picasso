import { FOCUS_RING } from '@toptal/picasso-shared'

export const summaryRootClasses = [
  'relative',
  'flex',
  'items-center',
  'select-none',
  'cursor-pointer',
  'rounded-sm',
  // Outer: the summary has no horizontal padding, so an inset ring would
  // cover its text
  FOCUS_RING.blue.focusVisible,
  'outline-none',
  'py-[0.5625em]',
  'px-0',
  'font-semibold',
  'text-black',
  'data-disabled:pointer-events-none',
]

export const summaryContentClasses = [
  'flex',
  'grow',
  'flex-row',
  'items-center',
  'justify-between',
  'm-0',
  'text-[0.875em]',
  'leading-[1.5em]',
]
