import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import type { Color } from '@material-ui/core'
import type { SimplePaletteColorOptions } from '@material-ui/core/styles/createPalette'

import kebabToCamelCase from '../utils/kebab-to-camel-case'

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

    ...alignItems,
    ...justifyContent,
    ...textAlignItems,
  })
