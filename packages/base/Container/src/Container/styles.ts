import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { capitalize } from '@material-ui/core'
import {
  spacingToRem,
  type DeprecatedSpacingType,
  type PicassoSpacing,
  spacings,
  kebabToCamelCase,
  snakeToCamelCase,
} from '@toptal/picasso-provider'

const textAlignVariants = [
  'inherit',
  'left',
  'center',
  'right',
  'justify',
] as const

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
type MapOfClasses = Record<string, Record<string, string>>

const directionVariants = ['top', 'left', 'bottom', 'right'] as const

const spacingVariants = [
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
] as const

type Direction = (typeof directionVariants)[number]
type Spacing = (typeof spacingVariants)[number]

export const paddings = spacingVariants.reduce((acc, variant) => {
  acc[`${variant}Padding`] = {
    // padding: spacingToRem(variant as DeprecatedSpacingType),
    padding: `p-[${spacingToRem(variant as DeprecatedSpacingType)}]`,
  }

  return acc
}, Object.create(null))

export const basePaddings = Object.keys(spacings).reduce((acc, spacingKey) => {
  acc[`${snakeToCamelCase(spacingKey)}Padding`] = {
    // padding: spacingToRem(spacings[spacingKey] as PicassoSpacing),
    padding: `p-[${spacingToRem(spacings[spacingKey] as PicassoSpacing)}]`,
    // p-2
  }

  return acc
}, Object.create(null))

const marginClassDef = (direction: Direction, spacing: Spacing) => ({
  [`margin${capitalize(direction)}`]: spacingToRem(spacing),
})

const marginClasses = (direction: Direction) => {
  return {
    [`${direction}${'xsmall'}Margin`]: marginClassDef(direction, 'xsmall'),
    [`${direction}${'small'}Margin`]: marginClassDef(direction, 'small'),
    [`${direction}${'medium'}Margin`]: marginClassDef(direction, 'medium'),
    [`${direction}${'large'}Margin`]: marginClassDef(direction, 'large'),
    [`${direction}${'xlarge'}Margin`]: marginClassDef(direction, 'xlarge'),
  }
}

const baseMarginClasses = (direction: Direction) => {
  return Object.keys(spacings).reduce((acc, spacingKey) => {
    acc[`${direction}${snakeToCamelCase(spacingKey, true)}Margin`] = {
      [`margin${capitalize(direction)}`]: spacingToRem(spacings[spacingKey]),
    }

    return acc
  }, Object.create(null))
}

const margins: MapOfClasses = {
  ...marginClasses('top'),
  ...marginClasses('left'),
  ...marginClasses('bottom'),
  ...marginClasses('right'),
}

const baseMargins: MapOfClasses = {
  ...baseMarginClasses('top'),
  ...baseMarginClasses('left'),
  ...baseMarginClasses('bottom'),
  ...baseMarginClasses('right'),
}

const alignItems: MapOfClasses = {}

alignItemsVariants.forEach(variant => {
  alignItems[`${kebabToCamelCase(variant)}AlignItems`] = {
    alignItems: variant,
  }
})

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

const textAlignItems: MapOfClasses = {}

textAlignVariants.forEach(variant => {
  textAlignItems[`${variant}TextAlign`] = {
    textAlign: variant,
  }
})

const justifyContent: MapOfClasses = {}

justifyContentVariants.forEach(variant => {
  justifyContent[`${kebabToCamelCase(variant)}JustifyContent`] = {
    justifyContent: variant,
  }
})

export const variantClassesByColor: Record<VariantType, string> = {
  white: 'bg-white',
  red: 'bg-red-100',
  green: 'bg-green-100',
  yellow: 'bg-yellow-100',
  blue: 'bg-blue-100',
  grey: 'bg-gray-200',
  transparent: '',
}

// export const flexClassesByDirection: Record<string, string> = {
//   column: 'flex-col',
//   rowReverse: 'flex-row-reverse',
//   columnReverse: 'flex-col-reverse',
// }

export default ({ palette, sizes: { borderRadius } }: Theme) =>
  createStyles({
    bordered: {
      border: `1px solid ${palette.grey.lighter2}`,
    },

    rounded: {
      borderRadius: borderRadius.medium,
    },

    flex: {
      display: 'flex',

      '&$inline': {
        display: 'inline-flex',
      },
    },

    column: {
      flexDirection: 'column',
    },

    rowReverse: {
      flexDirection: 'row-reverse',
    },

    columnReverse: {
      flexDirection: 'column-reverse',
    },

    inline: {
      display: 'inline-block',
    },

    whiteVariant: {
      backgroundColor: palette.common.white,
    },

    // redVariant: colorVariant(palette.red),

    // greenVariant: colorVariant(palette.green),

    // yellowVariant: colorVariant(palette.yellow),

    // blueVariant: colorVariant(palette.blue),

    // greyVariant: colorVariant(palette.grey),

    ...paddings,
    ...basePaddings,
    ...margins,
    ...baseMargins,
    ...alignItems,
    ...justifyContent,
    ...textAlignItems,
  })
