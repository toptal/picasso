import { extendTailwindMerge, twJoin } from 'tailwind-merge'

export const PICASSO_TW_FONT_SIZES = [
  'text-2xs',
  'text-xxs',
  'text-sm',
  'text-md',
  'text-lg',
  'text-xl',
  'text-2xl',
  'text-xxl',
  'text-button-small',
  'text-button-medium',
  'text-button-large',
]

export const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [...PICASSO_TW_FONT_SIZES, 'font-inherit-size'],
    },
  },
})

export { twJoin }
