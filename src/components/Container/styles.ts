import { Theme, createStyles } from '@material-ui/core/styles'

import { SpacingEnum, SpacingType, spacingToEm } from '../Picasso'
import { alpha, createPropertiesStyles } from '../styles'

const spacingVariants = Object.keys(SpacingEnum).filter(variant =>
  Number.isNaN(Number(variant))
)

const paddings = spacingVariants.reduce((acc, variant) => {
  acc[`${variant}Padding`] = {
    padding: spacingToEm(variant as SpacingType)
  }

  return acc
}, Object.create(null))

const colorVariant = (color?: string) => {
  if (!color) {
    return {}
  }

  return createPropertiesStyles({
    backgroundColor: alpha(color, 0.04),

    '&$bordered': {
      borderColor: color
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
    inline: {
      display: 'inline-block'
    },

    whiteVariant: colorVariant(),

    redVariant: colorVariant(palette.red.main),

    greenVariant: colorVariant(palette.green.main),

    yellowVariant: colorVariant(palette.yellow.main),

    blueVariant: colorVariant(palette.blue.main),

    ...paddings
  })
