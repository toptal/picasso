const alignItemsVariants = [
  'flex-start',
  'flex-end',
  'center',
  'stretch',
  'baseline',
] as const

const justifyContentVariants = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
] as const

const containerVariants = [
  'transparent',
  'red',
  'green',
  'white',
  'yellow',
  'blue',
  'grey',
] as const

export type VariantType = (typeof containerVariants)[number]
export type AlignItemsType = (typeof alignItemsVariants)[number]
export type JustifyContentType = (typeof justifyContentVariants)[number]

export const alignmentClasses = {
  alignItems: {
    'flex-start': 'items-start',
    'flex-end': 'items-end',
    center: 'items-center',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  },
  textAlign: {
    inherit: '[text-align:inherit]',
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  },
  justifyContent: {
    center: 'justify-center',
    'flex-start': 'justify-start',
    'flex-end': 'justify-end',
    'space-between': 'justify-between',
    'space-around': 'justify-around',
    'space-evenly': 'justify-evenly',
  },
  direction: {
    column: 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'column-reverse': 'flex-col-reverse',
  },
} as const

export const variantClassesByColor: Record<VariantType, string> = {
  white: 'bg-white',
  red: 'bg-red-100',
  green: 'bg-green-100',
  yellow: 'bg-yellow-100',
  blue: 'bg-blue-100',
  grey: 'bg-gray-200',
  transparent: '',
}
