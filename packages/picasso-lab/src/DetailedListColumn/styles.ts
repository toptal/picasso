import { createStyles, Theme } from '@material-ui/core'

export default ({ palette }: Theme) =>
  createStyles({
    cell: {
      padding: '0.5rem 1.5rem 0.5rem 0.5rem'
    },
    cellStriped: {
      backgroundColor: palette.grey.lighter
    },
    cellOverflow: {
      flexGrow: 1
    },
    rowOverflow: {
      width: '200%'
    }
  })
