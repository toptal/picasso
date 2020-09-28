import { Theme, createStyles } from '@material-ui/core/styles'
import { PicassoProvider, alpha } from '@toptal/picasso-shared'

PicassoProvider.override(() => ({}))

export default ({ palette, sizes, transitions }: Theme) =>
  createStyles({
    root: {
      height: 'auto',

      '&$selected': {
        backgroundColor: alpha(palette.common.black, 0.04)
      },

      '&$hover:hover': {
        backgroundColor: palette.blue.lighter
      }
    },
    head: {
      borderBottom: `${sizes.borderWidth} solid ${palette.grey.lighter2}`
    },
    stripeEven: {
      background: alpha(palette.grey.lighter2!, 0.32)
    },
    hover: {
      transition: transitions.create('background-color', {
        duration: transitions.duration.shortest
      })
    },
    selected: {}
  })
