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
      'font-weight': ['font-regular', 'font-semibold', 'font-inherit-weight'],
      'text-alignment': [
        'text-align-inherit',
        'text-left',
        'text-center',
        'text-right',
        'text-justify',
        'text-start',
        'text-end',
      ],
    },
  },
})

export { twJoin }
