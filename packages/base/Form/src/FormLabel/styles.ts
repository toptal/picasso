import { twJoin } from '@toptal/picasso-tailwind-merge'

import type { Layout } from '../FieldsLayout/FieldsLayoutContext'
import type { Alignment, Size } from './FormLabel'

export const classesBySize: Record<Size, string> = {
  medium: 'text-[0.875rem]',
  large: 'text-[1rem]',
}

type GetRootClassesOptions = {
  disabled?: boolean
  isInline: boolean
  layout: Layout
  alignment: Alignment
}

const getDisplayClasses = ({
  isInline,
  layout,
  alignment,
}: Partial<GetRootClassesOptions>) => {
  if (layout === 'horizontal' && alignment === 'top') {
    return 'flex items-start'
  }

  if (layout === 'horizontal') {
    return 'flex items-center'
  }

  if (isInline) {
    return 'inline-block'
  }

  return 'block'
}

const getMarginClasses = ({
  layout,
  isInline,
}: Partial<GetRootClassesOptions>) =>
  layout === 'horizontal' || isInline ? 'mb-0' : 'mb-[0.5em]'

const getPaddingsClasses = ({
  layout,
  alignment,
}: Partial<GetRootClassesOptions>) =>
  layout === 'horizontal' && alignment === 'top' ? 'pt-2' : ''

const getColorClasses = ({ disabled }: Partial<GetRootClassesOptions>) =>
  disabled ? 'text-graphite-700/[0.48]' : 'text-graphite-700'

export const getRootClasses = ({
  disabled,
  isInline,
  layout,
  alignment,
}: GetRootClassesOptions) => {
  return twJoin(
    getDisplayClasses({ isInline, layout, alignment }),
    'leading-[1em]',
    getMarginClasses({ layout, isInline }),
    getColorClasses({ disabled }),
    getPaddingsClasses({ layout, alignment })
  )
}
