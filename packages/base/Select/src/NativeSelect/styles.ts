import { spacingBySize } from '@toptal/picasso-outlined-input'
import type { Size } from '@toptal/picasso-outlined-input'

// The `select` fills a `p-0` field, so it carries the field's inset itself
export const getSelectClassName = ({
  size,
  selected,
  startAdornment,
  endAdornment,
}: {
  size: Size
  selected: boolean
  startAdornment: boolean
  endAdornment: boolean
}) => [
  'w-full focus:bg-inheritColor',
  spacingBySize[size],
  'pr-[1.625rem]', // caret reserve, as in the non-native select
  !selected && 'text-gray-600',
  startAdornment && 'pl-[2.5625rem]',
  endAdornment && 'pr-[3.5625rem]',
]
