import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    pointLink: {
      fill: 'none',
      stroke: palette.grey.light2,
    },
  })
