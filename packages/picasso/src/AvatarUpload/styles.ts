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

      '&$error': {
        color: palette.red.main,
      },
    },

    sizeSmall: {
      width: '5rem',
      height: '5rem',
    },

    sizeLarge: {
      width: '10rem',
      height: '10rem',
    },

    icon: {
      position: 'absolute',
      pointerEvents: 'none',
    },

    error: {},
  })
