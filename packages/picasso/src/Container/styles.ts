import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { capitalize, type Color } from '@material-ui/core'
import type { SimplePaletteColorOptions } from '@material-ui/core/styles/createPalette'
import {
  spacingToRem,
  type PicassoSpacing,
  spacings,
} from '@toptal/picasso-provider/index'
import {
  kebabToCamelCase,
  snakeToCamelCase,
} from '@toptal/picasso-provider/utils'

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

const colorVariant = (colorOptions?: SimplePaletteColorOptions | Color) => {
  if (!colorOptions) {
    return {}
  }

  return {
    backgroundColor: colorOptions.lighter2 ?? colorOptions.lighter,
  }
}

const directionVariants = ['top', 'left', 'bottom', 'right'] as const

type Direction = (typeof directionVariants)[number]

const basePaddings = Object.keys(spacings).reduce((acc, spacingKey) => {
  acc[`${snakeToCamelCase(spacingKey)}Padding`] = {
    padding: spacingToRem(spacings[spacingKey] as PicassoSpacing),
  }

  return acc
}, Object.create(null))

const baseGaps = Object.keys(spacings).reduce((acc, spacingKey) => {
  acc[`${snakeToCamelCase(spacingKey)}Gap`] = {
    gap: spacingToRem(spacings[spacingKey] as PicassoSpacing),
  }

  return acc
}, Object.create(null))

const baseMarginClasses = (direction: Direction) => {
  return Object.keys(spacings).reduce((acc, spacingKey) => {
    acc[`${direction}${snakeToCamelCase(spacingKey, true)}Margin`] = {
      [`margin${capitalize(direction)}`]: spacingToRem(spacings[spacingKey]),
    }

    return acc
  }, Object.create(null))
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

    redVariant: colorVariant(palette.red),

    greenVariant: colorVariant(palette.green),

    yellowVariant: colorVariant(palette.yellow),

    blueVariant: colorVariant(palette.blue),

    greyVariant: colorVariant(palette.grey),

    ...basePaddings,
    ...baseMargins,
    ...alignItems,
    ...justifyContent,
    ...textAlignItems,
    ...baseGaps,
  })
