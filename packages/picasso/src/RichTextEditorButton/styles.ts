import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ palette, sizes }: Theme) =>
  createStyles({
    button: {
      borderRadius: sizes.borderRadius.small,

      '&+&': {
        marginLeft: '0.5em',
      },
    },

    activeButton: {
      backgroundColor: palette.grey.dark,

      '&:not(:hover) svg': {
        fill: palette.common.white,
      },
    },
  })
