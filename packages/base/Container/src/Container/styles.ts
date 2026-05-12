export type AlignItemsType =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'baseline'

export type JustifyContentType =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'

export type VariantType =
  | 'transparent'
  | 'red'
  | 'green'
  | 'white'
  | 'yellow'
  | 'blue'
  | 'grey'

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
  wrap: {
    wrap: 'flex-wrap',
    'wrap-reverse': 'flex-wrap-reverse',
    nowrap: 'flex-nowrap',
  },
} as const

export const variantClassesByColor: Record<VariantType, string> = {
  white: 'bg-white',
  red: 'bg-red-100 border border-solid border-red-150',
  green: 'bg-green-100 border border-solid border-green-150',
  yellow: 'bg-yellow-100 border border-solid border-yellow-150',
  blue: 'bg-blue-100 border border-solid border-blue-150',
  grey: 'bg-gray-200 border border-solid border-gray-400',
  transparent: '',
}
