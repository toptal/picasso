import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(() => ({}))

export default ({ palette, sizes, transitions }: Theme) =>
  createStyles({
    root: {
      height: 'auto',

      '&$selected': {
        backgroundColor: palette.blue.lighter,
        '&:hover': {
          backgroundColor: palette.blue.lighter,
        },
      },

      '&$hover:hover': {
        backgroundColor: palette.blue.lighter,
      },
    },
    bordered: {
      borderBottom: `${sizes.borderWidth} solid ${palette.grey.lighter2}`,
    },
    stripeEven: {
      background: palette.grey.lighter,
    },
    hover: {
      transition: transitions.create('background-color', {
        duration: transitions.duration.shortest,
      }),
    },
    selected: {},
  })
