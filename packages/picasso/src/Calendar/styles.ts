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
      paddingTop: rem('3px'),
      paddingBottom: rem('11px'),
    },
    head_cell: {
      padding: 0,
      flexBasis: '15%',
      width: '40px',
      fontWeight: 400,
    },
    table: {
      borderSpacing: '0px',
    },
    row: {
      display: 'flex',
    },
    cell: {
      padding: 0,
      height: '2.5rem',
      width: '2.5rem',
    },
    vhidden: {
      display: 'none',
    },
  })
