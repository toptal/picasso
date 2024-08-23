import type { ListItemType } from './context'
import type { Variant } from './types'

export const listStyleTypeClass: Record<ListItemType, string> = {
  circle: 'list-[circle]',
  disc: 'list-disc',
  checkmark: 'list-none',
  arrow: 'list-none',
  numeral: 'list-decimal',
  alpha: 'list-[lower-alpha]',
  roman: 'list-[lower-roman]',
}

export const getPaddingClasses = ({
  variant,
  level,
}: {
  variant: Variant
  level: number
}) => (level === 0 || variant !== 'unordered' ? 'pl-4' : 'pl-6')
