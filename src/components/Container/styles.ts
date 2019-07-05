import { Theme, createStyles } from '@material-ui/core/styles'
import { SimplePaletteColorOptions } from '@material-ui/core/styles/createPalette'

import { SpacingEnum, SpacingType, spacingToEm } from '../Picasso'
import { createPropertiesStyles } from '../styles'

const spacingVariants = Object.keys(SpacingEnum).filter(variant =>
  Number.isNaN(Number(variant))
)

const paddings = spacingVariants.reduce((acc, variant) => {
  acc[`${variant}Padding`] = {
    padding: spacingToEm(variant as SpacingType)
  }

  return acc
}, Object.create(null))

const colorVariant = (colorOptions?: SimplePaletteColorOptions) => {
  if (!colorOptions) {
    return {}
  }

  return createPropertiesStyles({
    backgroundColor: colorOptions.lighter,

    '&$bordered': {
      borderColor: colorOptions.main
    }
  })
}

export default ({ palette }: Theme) =>
  createStyles({
    bordered: {
      border: `1px solid ${palette.grey.lighter}`
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

    whiteVariant: colorVariant(),

    redVariant: colorVariant(palette.red),

    greenVariant: colorVariant(palette.green),

    yellowVariant: colorVariant(palette.yellow),

    blueVariant: colorVariant(palette.blue),

    ...paddings
  })
