import { createStyles, Theme } from '@material-ui/core/styles'
import { alpha } from '@toptal/picasso-shared'

export default ({ palette }: Theme) => {
  const hoverIconColor = alpha(palette.blue.main, 0.84)

  return createStyles({
    root: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: palette.blue.main,
      outline: 'none',
      cursor: 'pointer',

      '&$error': {
        color: palette.red.main,
      },

      '&$disabled': {
        cursor: 'no-drop',
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

      '&$hovered': {
        color: hoverIconColor,
      },
    },

    error: {},
    disabled: {},
    hovered: {},
  })
}
