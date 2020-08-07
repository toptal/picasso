import capitalize from '@material-ui/core/utils/capitalize'
import { Theme, createStyles } from '@material-ui/core/styles'
import { Color } from '@material-ui/core'
import { SimplePaletteColorOptions } from '@material-ui/core/styles/createPalette'
import {
  SpacingType,
  spacingToRem,
  createPropertiesStyles
} from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'

const alignItemsVariants = [
  'flex-start',
  'flex-end',
  'center',
  'stretch',
  'baseline'
] as const

const justifyContentVariants = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly'
] as const

const directionVariants = ['top', 'left', 'bottom', 'right'] as const

const spacingVariants = [
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge'
] as const

const borderRadius = '8px'

export type AlignItemsType = typeof alignItemsVariants[number]
export type JustifyContentType = typeof justifyContentVariants[number]
type Direction = typeof directionVariants[number]
type Spacing = typeof spacingVariants[number]
type MapOfClasses = Record<string, Record<string, string>>

const paddings = spacingVariants.reduce((acc, variant) => {
  acc[`${variant}Padding`] = {
    padding: spacingToRem(variant as SpacingType)
  }

  return acc
}, Object.create(null))

const colorVariant = (colorOptions?: SimplePaletteColorOptions | Color) => {
  if (!colorOptions) {
    return {}
  }

  return createPropertiesStyles({
    backgroundColor: colorOptions.lighter,
    borderRadius,

    '&$bordered': {
      borderColor: colorOptions.main
    }
  })
}

const marginClassDef = (direction: Direction, spacing: Spacing) => ({
  [`margin${capitalize(direction)}`]: spacingToRem(spacing)
})

const marginClasses = (direction: Direction) => {
  return {
    [`${direction}${'xsmall'}Margin`]: marginClassDef(direction, 'xsmall'),
    [`${direction}${'small'}Margin`]: marginClassDef(direction, 'small'),
    [`${direction}${'medium'}Margin`]: marginClassDef(direction, 'medium'),
    [`${direction}${'large'}Margin`]: marginClassDef(direction, 'large'),
    [`${direction}${'xlarge'}Margin`]: marginClassDef(direction, 'xlarge')
  }
}

const margins: MapOfClasses = {
  ...marginClasses('top'),
  ...marginClasses('left'),
  ...marginClasses('bottom'),
  ...marginClasses('right')
}

const alignItems: MapOfClasses = {}

alignItemsVariants.forEach(variant => {
  alignItems[`${kebabToCamelCase(variant)}AlignItems`] = {
    alignItems: variant
  }
})

const justifyContent: MapOfClasses = {}

justifyContentVariants.forEach(variant => {
  justifyContent[`${kebabToCamelCase(variant)}JustifyContent`] = {
    justifyContent: variant
  }
})

export default ({ palette }: Theme) =>
  createStyles({
    bordered: {
      border: `1px solid ${palette.grey.lighter}`,
      borderRadius
    },

    flex: {
      display: 'flex',

      '&$inline': {
        display: 'inline-flex'
      }
    },

    column: {
      flexDirection: 'column'
    },

    inline: {
      display: 'inline-block'
    },

    whiteVariant: createPropertiesStyles({
      backgroundColor: palette.common.white,
      borderRadius
    }),

    redVariant: colorVariant(palette.red),

    greenVariant: colorVariant(palette.green),

    yellowVariant: colorVariant(palette.yellow),

    blueVariant: colorVariant(palette.blue),

    greyVariant: colorVariant(palette.grey),

    ...paddings,
    ...margins,
    ...alignItems,
    ...justifyContent
  })
