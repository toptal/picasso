import { twMerge } from '@toptal/picasso-tailwind-merge'

import type { VariantType } from '../PageSidebar/types'

export const styles = {
  paddingLeft: 'pt-0 pr-0 pb-0 pl-4',
  margin: 'mx-4',
  content: 'max-w-full',
  icon: (variant?: VariantType, disabled?: boolean) =>
    twMerge([
      'text-base',
      variant === 'light' ? 'text-graphite-700' : 'text-gray-500',
      disabled && 'text-gray-500',
    ]),
}
