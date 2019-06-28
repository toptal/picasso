import { Theme, createStyles } from '@material-ui/core/styles'

import { SpacingEnum, SpacingType, spacingToEm } from '../Picasso'

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

    ...paddings
  })
