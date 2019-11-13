import { Theme, createStyles } from '@material-ui/core/styles'

import { alpha } from '../styles'

export default ({ palette }: Theme) =>
  createStyles({
    stripEven: {
      background: alpha(palette.grey.lighter!, 0.32)
    }
  })
