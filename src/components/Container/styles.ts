import { Theme, createStyles } from '@material-ui/core/styles'

import { SpacingEnum, SpacingType, spacingToEm } from '../Picasso'
import { white } from 'color-name'
import { alpha } from '../styles'

const spacingVariants = Object.keys(SpacingEnum).filter(variant =>
  Number.isNaN(Number(variant))
)

const paddings = spacingVariants.reduce((acc, variant) => {
  acc[`${variant}Padding`] = {
    padding: spacingToEm(variant as SpacingType)
  }

  return acc
}, Object.create(null))

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

    whiteVariant: {},

    redVariant: {
      backgroundColor: palette.red.main,

      '&$bordered': {
        backgroundColor: alpha(palette.red.main, 0.04),
        borderColor: palette.red.main
      }
    },

    greenVariant: {
      backgroundColor: palette.green.main,

      '&$bordered': {
        backgroundColor: alpha(palette.green.main, 0.04),
        borderColor: palette.green.main
      }
    },

    yellowVariant: {
      backgroundColor: palette.yellow.main,

      '&$bordered': {
        backgroundColor: alpha(palette.yellow.main, 0.04),
        borderColor: palette.yellow.main
      }
    },

    blueVariant: {
      backgroundColor: palette.blue.main,

      '&$bordered': {
        backgroundColor: alpha(palette.blue.main, 0.04),
        borderColor: palette.blue.main
      }
    },

    ...paddings
  })
