import { createStyles, Theme } from '@material-ui/core/styles'
import { alpha } from '@toptal/picasso-shared'

export default ({ palette }: Theme) => {
  const iconHoverColor = alpha(palette.blue.main, 0.84)
  const iconHoverErrorColor = alpha(palette.red.main, 0.84)

  return createStyles({
    root: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: palette.blue.main,
      outline: 'none',
      cursor: 'pointer',

      '&$disabled': {
        cursor: 'no-drop',
      },

      '&$readonlyAvatar': {
        cursor: 'default',
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

      '&$error': {
        color: palette.red.main,
      },

      '&$hovered': {
        color: iconHoverColor,

        '&$error': {
          color: iconHoverErrorColor,
        },
      },
    },

    error: {},
    disabled: {},
    hovered: {},
    readonlyAvatar: {},
  })
}
