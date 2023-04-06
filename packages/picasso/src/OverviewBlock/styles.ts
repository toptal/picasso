import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

export default ({ palette, sizes }: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: palette.common.white,
      margin: 0,
      minWidth: rem('150px'),
      border: 'none',
      textDecoration: 'none',
      '&:not(:first-child)': {
        borderLeft: `${sizes.borderWidth} solid ${palette.grey.light2}`,
      },
    },
    clickable: {
      cursor: 'pointer',
      outline: 'none',
      '&:hover': {
        backgroundColor: palette.blue.lighter,
      },
    },
    disableOutline: {
      outline: 'none',
    },

    defaultAlign: {
      alignItems: 'flex-start',
    },
    centerAlign: {
      alignItems: 'center',
    },
    narrowWidth: {
      padding: '0.75rem 1rem',
    },
    regularWidth: {
      padding: '0.75rem 1.5rem',
    },
    wideWidth: {
      padding: '0.75rem 2rem',
    },
  })
