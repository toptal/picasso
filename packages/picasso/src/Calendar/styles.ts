import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

export default ({ palette }: Theme) =>
  createStyles({
    head: {
      display: 'block',
    },
    head_row: {
      display: 'flex',
      textAlign: 'center',
      fontSize: rem('12px'),
      lineHeight: rem('18px'),
      textTransform: 'uppercase',
      color: palette.grey.main2,
      paddingTop: rem('2px'),
      paddingBottom: rem('9px'),
    },
    head_cell: {
      flexBasis: '15%',
      width: '40px',
      fontWeight: 400,
    },
    row: {
      display: 'flex',
    },
    cell: {
      height: '2.5rem',
      width: '2.5rem',
    },
    vhidden: {
      display: 'none',
    },
  })
