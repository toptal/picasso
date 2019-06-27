import { Theme, createStyles } from '@material-ui/core/styles'

import { alpha } from '../styles'
import { PicassoProvider } from '../Picasso'

PicassoProvider.override(() => ({}))

export default ({ palette, spacing, transitions }: Theme) =>
  createStyles({
    root: {
      height: 'auto',

      '&:nth-of-type(even)': {
        background: alpha(palette.grey.lighter!, 0.32)
      },

      '&$hover:hover': {
        backgroundColor: palette.blue.lighter
      }
    },

    head: {
      borderBottom: `${spacing.borderWidth} solid ${palette.grey.lighter}`
    },

    hover: {
      transition: transitions.create('background-color', {
        duration: transitions.duration.shortest
      })
    }
  })
