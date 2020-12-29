import { Theme, createStyles } from '@material-ui/core/styles'
import { alpha } from '@toptal/picasso-shared'

export default ({ palette }: Theme) =>
  createStyles({
    stripeEven: {
      background: alpha(palette.grey.lighter2!, 0.32)
    },
    noPadding: {
      padding: 0,
      '&:last-child': {
        paddingRight: 0
      }
    }
  })
