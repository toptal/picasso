import { createStyles, Theme } from '@material-ui/core'

export default ({ palette }: Theme) =>
  createStyles({
    cell: {
      padding: '8px 24px 8px 8px'
    },
    cellStriped: {
      backgroundColor: palette.grey.lighter
    }
  })
