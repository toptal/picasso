import { createStyles, Theme } from '@material-ui/core'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      '&$stripped': {
        '& > $row:nth-child(2n)': {
          backgroundColor: palette.grey.lighter
        }
      }
    },
    row: {
      padding: 8
    },
    stripped: {}
  })
