import { Theme, createStyles } from '@material-ui/core/styles'
import { alpha } from '@toptal/picasso-shared'

export default ({ palette }: Theme) =>
  createStyles({
    stripeEven: {
      background: alpha(palette.grey.lighter!, 0.32)
    }
  })
