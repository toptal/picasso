import { twMerge } from '@toptal/picasso-tailwind-merge'

import type { VariantType } from '../PageSidebar/types'

export const styles = {
  icon: (variant?: VariantType, disabled?: boolean) =>
    twMerge([
      'text-base',
      variant === 'light' ? 'text-graphite-700' : 'text-gray-500',
      disabled && 'text-gray-500',
    ]),
}
