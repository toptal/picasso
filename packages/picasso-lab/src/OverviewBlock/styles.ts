import { createStyles, Theme } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

export default ({ palette, sizes }: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: palette.common.white,
      padding: '0.75rem 1.5rem',
      margin: 0,
      minWidth: rem('150px'),
      border: 'none',
      textDecoration: 'none',
      '&:not(:first-child)': {
        borderLeft: `${sizes.borderWidth} solid ${palette.grey.lighter}`
      }
    },
    clickable: {
      cursor: 'pointer',
      outline: 'none',
      '&:hover': {
        backgroundColor: palette.blue.lighter
      }
    },
    disableOutline: {
      outline: 'none'
    },
    title: {
      fontSize: rem('11px')
    },
    defaultAlign: {
      alignItems: 'flex-start'
    },
    centerAlign: {
      alignItems: 'center'
    }
  })
