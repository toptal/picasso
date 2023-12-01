/* eslint-disable import/no-extraneous-dependencies */
import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
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

    sizeXxsmall: {
      width: '2rem',
      height: '2rem',
    },
    sizeXsmall: {
      width: '2.5rem',
      height: '2.5rem',
    },
    sizeSmall: {
      width: '5rem',
      height: '5rem',
    },
    sizeMedium: {
      width: '7.5rem',
      height: '7.5rem',
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
