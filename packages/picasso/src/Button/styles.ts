import { Theme, createStyles } from '@material-ui/core/styles'
import { lighten, darken, alpha } from '@toptal/picasso-shared'

const ICON_SPACING = '0.4em'

const primary = (mainColor: string, secondaryColor: string) => ({
  border: 'none',
  color: secondaryColor,
  backgroundColor: mainColor,

  '&:focus, &focused': {
    backgroundColor: darken(mainColor, 0.2)
  },

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

  '&:focus, &focused': {
    backgroundColor: lighten(mainColor, 0.84),
    borderColor: mainColor
  },

  '&:hover, &$hovered': {
    backgroundColor: lighten(mainColor, 0.84),
    borderColor: mainColor
  },

  '&:active, &$active': {
    backgroundColor: lighten(mainColor, 0.84),
    borderColor: mainColor
  }
})

const transparent = (color?: string) => ({
  border: 'none',
  color
})

export default ({ palette, sizes, transitions, typography }: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      textTransform: 'none',
      borderRadius: sizes.borderRadius,
      border: `solid ${sizes.borderWidth} ${palette.grey.light}`,
      fontSize: '1rem',
      transition: `all ${transitions.duration.short}ms ${transitions.easing.easeOut}`,
      transitionProperty: 'border, color, background',

      '&:focus, &focused': {
        textDecoration: 'underline',

        '&:hover, &$hovered, &:active, &$active': {
          textDecoration: 'none'
        }
      },

      '&+&': {
        marginLeft: '0.5em'
      }
    },
    content: {
      lineHeight: '1.5em',
      fontWeight: typography.fontWeights.semibold,
      whiteSpace: 'nowrap'
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
        fontSize: typography.buttons.fontSizeSmall,
        lineHeight: typography.buttons.lineHeightSmall
      },

      '&$circular': {
        width: '1.5em'
      }
    },
    medium: {
      height: '2.25em',
      padding: '0 1em',

      '& $content': {
        fontSize: typography.buttons.fontSizeMedium,
        lineHeight: typography.buttons.lineHeightMedium
      },

      '&$circular': {
        width: '2.25em'
      }
    },
    large: {
      height: '3em',
      padding: '0 3.625em',

      '& $content': {
        fontSize: typography.buttons.fontSizeLarge,
        lineHeight: typography.buttons.lineHeightLarge,
        fontWeight: typography.fontWeights.semibold
      },

      '&$circular': {
        width: '3em'
      }
    },

    // variants
    primaryBlue: primary(palette.primary.main, palette.common.white),
    secondaryBlue: secondary(palette.primary.main, palette.common.white),
    primaryRed: primary(palette.red.main, palette.common.white),
    secondaryRed: secondary(palette.red.main, palette.common.white),
    primaryGreen: primary(palette.green.main, palette.common.white),
    secondaryGreen: secondary(palette.green.main, palette.common.white),

    secondaryWhite: {
      color: palette.common.white,
      border: `solid ${sizes.borderWidth} rgba(255, 255, 255, 0.32)`,

      '&:focus, &focused': {
        backgroundColor: alpha(palette.common.white, 0.16),
        borderColor: palette.common.white
      },

      '&:hover, &$hovered': {
        backgroundColor: alpha(palette.common.white, 0.16),
        borderColor: palette.common.white
      },

      '&:active, &$active': {
        backgroundColor: alpha(palette.common.white, 0.16),
        borderColor: palette.common.white
      }
    },
    flat: {
      ...secondary(palette.common.black, palette.common.white),
      border: 'none'
    },
    flatWhite: {
      color: palette.common.white,
      border: 'none',

      '&:focus, &focused': {
        backgroundColor: alpha(palette.common.white, 0.16)
      },

      '&:hover, &$hovered': {
        backgroundColor: alpha(palette.common.white, 0.16)
      },

      '&:active, &$active': {
        backgroundColor: alpha(palette.common.white, 0.16)
      }
    },
    transparent: {
      ...transparent()
    },
    transparentWhite: {
      ...transparent(palette.common.white)
    },
    transparentBlue: {
      ...transparent(palette.primary.main)
    },
    transparentGreen: {
      ...transparent(palette.green.main)
    },
    transparentDisabled: {
      ...transparent(palette.grey.light),
      border: 'none'
    },
    primaryDisabled: primary(palette.grey.light!, palette.common.white),
    secondaryDisabled: secondary(palette.grey.light!, palette.common.white),
    flatDisabled: {
      ...secondary(palette.grey.light!, palette.common.white),
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
      fontSize: '1.2em !important',
      flex: '1 1 0%' // IE11 fix
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
