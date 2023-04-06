import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ sizes, palette }: Theme) =>
  createStyles({
    root: {
      borderTop: `${sizes.borderWidth} solid ${palette.grey.lighter2}`,
    },
  })
