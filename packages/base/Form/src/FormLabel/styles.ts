import { twJoin } from '@toptal/picasso-tailwind-merge'

import type { Layout } from '../FieldsLayout/FieldsLayoutContext'
import type { Alignment, Size } from './FormLabel'

export const classesBySize: Record<Size, string> = {
  medium: 'text-[0.875rem]',
  large: 'text-[1rem]',
}

export const getRootClasses = ({
  disabled,
  isInline,
  layout,
  alignment,
}: {
  disabled?: boolean
  isInline: boolean
  layout: Layout
  alignment: Alignment
}) => {
  return twJoin(
    'block text-graphite-700 mb-[0.5em] leading-[1em]',
    disabled && 'text-graphite-700/[0.48]',
    isInline &&
      `inline-block mb-0 [&_medium]:text-[0.8125rem] [&_medium]:align-top 
          [&_asterisk]:text-[0.8125rem] [&_asterisk]:align-top`,
    layout === 'horizontal' && 'flex items-center mb-0',
    layout === 'horizontal' && alignment === 'top' && 'pt-2 items-start'
  )
}
