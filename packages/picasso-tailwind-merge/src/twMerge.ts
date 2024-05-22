import { extendTailwindMerge, twJoin } from 'tailwind-merge'
import { theme } from '@toptal/picasso-tailwind'

export const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        ...Object.keys(theme.fontSize).map(key => `text-${key}`),
        'font-inherit-size',
      ],
    },
  },
})

export { twJoin }
