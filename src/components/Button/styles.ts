import { Theme, createStyles } from '@material-ui/core/styles'
import { Palette } from '@material-ui/core/styles/createPalette'

import { lighten, darken, alpha } from '../styles'

const ICON_SPACING = '0.4em'

const primary = (palette: Palette, color: string) => ({
  border: 'none',
  color: palette.common.white,
  backgroundColor: color,

  '&:hover, &$hovered': {
    backgroundColor: darken(color, 0.2)
  },

  '&:active, &$active': {
    backgroundColor: darken(color, 0.2)
  }
})

const secondary = (palette: Palette, color: string) => ({
  color,
  backgroundColor: palette.common.white,

  '&:hover, &$hovered': {
    backgroundColor: lighten(color, 0.8)
  },

  '&:active, &$active': {
    backgroundColor: lighten(color, 0.8)
  }
})

export default ({ palette, spacing, transitions }: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      textTransform: 'none',
      borderRadius: spacing.borderRadius,
      border: `solid ${spacing.borderWidth} ${palette.grey[100]}`,
      fontSize: '1rem',
      transition: `all ${transitions.duration.short}ms ${
        transitions.easing.easeOut
      }`,
      transitionProperty: 'border, color, background',

      '&:focus, &$focused': {
        textDecoration: 'underline',

        '&:active, &$active, &:hover': {
          textDecoration: 'none'
        }
      },

      '&+&': {
        marginLeft: '0.5em'
      }
    },
    content: {
      lineHeight: '1.5em',
      fontWeight: 600
    },
    loader: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)'
    },

    // sizes
    small: {
      height: '1.5em',
      padding: '0 0.75em',

      '& $content': {
        fontSize: '0.75em'
      },

      '&$circular': {
        width: '1.5em'
      }
    },
    medium: {
      height: '2.25em',
      padding: '0 1em',

      '& $content': {
        fontSize: '0.8125em'
      },

      '&$circular': {
        width: '2.25em'
      }
    },
    large: {
      height: '3em',
      padding: '0 3.625em',

      '& $content': {
        fontSize: '0.9375em'
      },

      '&$circular': {
        width: '3em'
      }
    },

    // variants
    primaryBlue: primary(palette, palette.primary.main),
    secondaryBlue: secondary(palette, palette.primary.main),
    primaryRed: primary(palette, palette.error.main),
    secondaryRed: secondary(palette, palette.error.main),
    primaryGreen: primary(palette, palette.success.main),
    secondaryWhite: {
      ...secondary(palette, palette.common.white),
      backgroundColor: 'transparent',
      border: `solid ${spacing.borderWidth} rgba(255, 255, 255, 0.32)`,

      '&:hover, &$hovered': {
        backgroundColor: alpha(palette.common.white, 0.8)
      },

      '&:active, &$active': {
        backgroundColor: alpha(palette.common.white, 0.8)
      }
    },
    flat: {
      ...secondary(palette, palette.common.black),
      border: 'none'
    },

    // Other props
    fullWidth: {
      width: '100%'
    },
    hovered: {},
    focused: {},
    active: {},
    circular: {
      borderRadius: '50%',
      padding: 0
    },

    // Child elements
    icon: {
      fontSize: '1.2em !important'
    },
    iconLeft: {
      marginRight: ICON_SPACING
    },
    iconRight: {
      marginLeft: ICON_SPACING
    },
    hidden: {
      opacity: 0
    }
  })
