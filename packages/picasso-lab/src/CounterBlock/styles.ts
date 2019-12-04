import { createStyles, Theme } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'
export default ({ palette }: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: `rgba(235, 236, 237, 0.32)`,
      padding: `${rem('8px')} ${rem('16px')}`,
      minWidth: rem('150px'),
      border: 'none',
      cursor: 'pointer',
      textDecoration: 'none',
      '&:hover': {
        backgroundColor: palette.grey.lighter
      }
    },
    title: {
      fontSize: rem('11px')
    }
  })
