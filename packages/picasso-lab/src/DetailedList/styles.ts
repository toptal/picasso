import { createStyles, Theme } from '@material-ui/core'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      borderSpacing: 0,

      '&$stripped $row:nth-child(2n)': {
        backgroundColor: palette.grey.lighter
      }
    },
    row: {
      padding: '16px 0'
    },
    stripped: {}
  })
