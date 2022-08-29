import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: palette.blue.main,
      outline: 'none',
    },

    size: {
      width: '5rem',
      height: '5rem',
    },

    icon: {
      position: 'absolute',
      cursor: 'pointer',
    },
  })
