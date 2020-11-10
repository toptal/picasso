import { createStyles, Theme } from '@material-ui/core'

export default ({ palette, ...rest }: Theme) => {
  console.log(rest)

  return createStyles({
    root: {
      width: 'auto',

      '&$striped $row:nth-child(2n)': {
        backgroundColor: palette.grey.lighter
      }
    },
    row: {
      backgroundColor: 'transparent'
    },
    striped: {},
    fixed: {}
  })
}
