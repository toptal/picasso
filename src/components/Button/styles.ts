import { Theme, createStyles } from '@material-ui/core/styles'

import { lighten, darken, alpha } from '../styles'

const ICON_SPACING = '0.4em'

const primary = (mainColor: string, secondaryColor: string) => ({
  border: 'none',
  color: secondaryColor,
  backgroundColor: mainColor,

  '&:hover, &$hovered': {
    backgroundColor: darken(mainColor, 0.2)
  },

  '&:active, &$active': {
    backgroundColor: darken(mainColor, 0.2)
  }
})

const secondary = (mainColor: string, secondaryColor: string) => ({
  color: mainColor,
  backgroundColor: secondaryColor,

  '&:hover, &$hovered': {
    backgroundColor: lighten(mainColor, 0.8)
  },

  '&:active, &$active': {
    backgroundColor: lighten(mainColor, 0.8)
  }
})

export default ({ palette, spacing, transitions, typography }: Theme) =>
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
        fontSize: typography.buttons.fontSizeSmall
      },

      '&$circular': {
        width: '1.5em'
      }
    },
    medium: {
      height: '2.25em',
      padding: '0 1em',

      '& $content': {
        fontSize: typography.buttons.fontSizeMedium
      },

      '&$circular': {
        width: '2.25em'
      }
    },
    large: {
      height: '3em',
      padding: '0 3.625em',

      '& $content': {
        fontSize: typography.buttons.fontSizeLarge
      },

      '&$circular': {
        width: '3em'
      }
    },

    // variants
    primaryBlue: primary(palette.primary.main, palette.common.white),
    secondaryBlue: secondary(palette.primary.main, palette.common.white),
    primaryRed: primary(palette.error.main, palette.common.white),
    secondaryRed: secondary(palette.error.main, palette.common.white),
    primaryGreen: primary(palette.success.main, palette.common.white),
    secondaryWhite: {
      ...secondary(palette.common.white, palette.common.white),
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
      ...secondary(palette.common.black, palette.common.white),
      border: 'none'
    },
    primaryDisabled: primary(palette.grey[100], palette.common.white),
    secondaryDisabled: secondary(palette.grey[100], palette.common.white),
    flatDisabled: {
      ...secondary(palette.grey[100], palette.common.white),
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
