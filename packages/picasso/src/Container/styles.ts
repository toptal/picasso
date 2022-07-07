import { SimplePaletteColorOptions } from '@mui/material/styles'
import { Color } from '@mui/material'
import { SpacingType, spacingToRem } from '@toptal/picasso-shared'
import { capitalize } from '@mui/material/utils'
import { makeStyles } from '@toptal/picasso-provider'

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

const directionVariants = ['top', 'left', 'bottom', 'right'] as const

const spacingVariants = [
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
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

export type VariantType = typeof containerVariants[number]
export type AlignItemsType = typeof alignItemsVariants[number]
export type JustifyContentType = typeof justifyContentVariants[number]
type Direction = typeof directionVariants[number]
type Spacing = typeof spacingVariants[number]
type MapOfClasses = Record<string, Record<string, string>>

const paddings = spacingVariants.reduce((acc, variant) => {
  acc[`${variant}Padding`] = {
    padding: spacingToRem(variant as SpacingType),
  }

  return acc
}, Object.create(null))

const gaps = spacingVariants.reduce((acc, variant) => {
  acc[`${variant}Gap`] = {
    gap: spacingToRem(variant as SpacingType),
  }

  return acc
}, Object.create(null))

const colorVariant = (colorOptions?: SimplePaletteColorOptions | Color) => {
  if (!colorOptions) {
    return {}
  }

  return {
    backgroundColor: colorOptions.lighter2 ?? colorOptions.lighter,
  }
}

const marginClassDef = (direction: Direction, spacing: Spacing) => ({
  [`margin${capitalize(direction)}`]: spacingToRem(spacing),
})

const marginClasses = (direction: Direction) => {
  return {
    [`${direction}xsmallMargin`]: marginClassDef(direction, 'xsmall'),
    [`${direction}smallMargin`]: marginClassDef(direction, 'small'),
    [`${direction}mediumMargin`]: marginClassDef(direction, 'medium'),
    [`${direction}largeMargin`]: marginClassDef(direction, 'large'),
    [`${direction}xlargeMargin`]: marginClassDef(direction, 'xlarge'),
  }
}

const margins: MapOfClasses = {
  ...marginClasses('top'),
  ...marginClasses('left'),
  ...marginClasses('bottom'),
  ...marginClasses('right'),
}

const alignItems: MapOfClasses = {}

alignItemsVariants.forEach(variant => {
  alignItems[`.${kebabToCamelCase(variant)}AlignItems`] = {
    alignItems: variant,
  }
})

const textAlignItems: MapOfClasses = {}

textAlignVariants.forEach(variant => {
  textAlignItems[`.${variant}TextAlign`] = {
    textAlign: variant,
  }
})

const justifyContent: MapOfClasses = {}

justifyContentVariants.forEach(variant => {
  justifyContent[`.${kebabToCamelCase(variant)}JustifyContent`] = {
    justifyContent: variant,
  }
})

const useStyles = makeStyles<void, 'inline'>({ name: 'Container' })(
  ({ palette, sizes: { borderRadius } }, _params, classes) => ({
    bordered: {
      border: `1px solid ${palette.grey.lighter2}`,
    },

    rounded: {
      borderRadius: borderRadius.medium,
    },

    flex: {
      display: 'flex',

      [`&.${classes.inline}`]: {
        display: 'inline-flex',
      },
    },

    column: {
      flexDirection: 'column',
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

    ...paddings,
    ...margins,
    ...alignItems,
    ...justifyContent,
    ...textAlignItems,
    ...gaps,
  })
)

export default useStyles
