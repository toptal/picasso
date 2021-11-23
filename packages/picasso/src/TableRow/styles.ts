import { Theme, createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-provider'

PicassoProvider.override(() => ({}))

export default ({ palette, transitions }: Theme) =>
  createStyles({
    root: {
      height: 'auto',

      '&$selected': {
        backgroundColor: palette.blue.lighter,
        '&:hover': {
          backgroundColor: palette.blue.lighter
        }
      },

      '&$hover:hover': {
        backgroundColor: palette.blue.lighter
      }
    },
    bordered: {
      borderCollapse: 'inherit'
    },
    clear: {
      borderBottom: 'none'
    },
    stripeEven: {
      background: palette.grey.lighter
    },
    hover: {
      transition: transitions.create('background-color', {
        duration: transitions.duration.shortest
      })
    },
    selected: {}
  })
