import { Theme, createStyles } from '@material-ui/core/styles'
import { alpha, mix } from '@toptal/picasso-shared'

const ICON_SPACING = '0.5em'

const primary = (
  mainColor: string,
  secondaryColor: string,
  ternaryColor: string
) => ({
  border: 'none',
  color: secondaryColor,
  backgroundColor: mainColor,

  '&:hover, &$hovered': {
    backgroundColor: mix(mainColor, secondaryColor, 0.152)
  },

  '&:active, &$active': {
    backgroundColor: mix(mainColor, 'black', 0.172)
  },

  '&$disabled': {
    backgroundColor: ternaryColor
  }
})

const secondary = (
  mainColor: string,
  secondaryColor: string,
  activeColor: string,
  disabledColor: string
) => ({
  color: mainColor,
  backgroundColor: secondaryColor,

  '&:hover, &$hovered': {
    borderColor: mainColor
  },

  '&:active, &$active': {
    backgroundColor: activeColor,
    borderColor: mainColor
  },

  '&$disabled': {
    color: disabledColor,
    borderColor: disabledColor,
    backgroundColor: secondaryColor
  }
})

export default ({ palette, sizes, transitions, typography }: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      textTransform: 'none',
      borderRadius: sizes.borderRadius.small,
      border: `solid ${sizes.borderWidth} ${palette.grey.light}`,
      fontSize: '1rem',
      transition: `all ${transitions.duration.short}ms ${transitions.easing.easeOut}`,
      transitionProperty: 'border, color, background',
      boxShadow: 'none',

      '&$focusVisible, &$focused': {
        boxShadow: `0 0 0 3px ${alpha(palette.primary.main, 0.48)}`
      },

      '&+&': {
        marginLeft: '1rem'
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
      minWidth: '3.5em',
      height: '1.5em',
      padding: '0 0.75em',

      '& $content': {
        fontSize: typography.buttons.fontSizeSmall,
        lineHeight: typography.buttons.lineHeightSmall
      },

      '&$circular': {
        minWidth: 'initial',
        width: '1.5em'
      },

      '& $iconLeft': {
        marginLeft: '-0.125em'
      },

      '& $iconRight': {
        marginRight: '-0.125em'
      }
    },
    medium: {
      minWidth: '4em',
      height: '2em',
      padding: '0 1em',

      '& $content': {
        fontSize: typography.buttons.fontSizeMedium,
        lineHeight: typography.buttons.lineHeightMedium
      },

      '& $iconLeft': {
        marginLeft: '-0.25em'
      },

      '& $iconRight': {
        marginRight: '-0.25em'
      }
    },
    large: {
      minWidth: '6em',
      height: '3em',
      padding: '0 2em',

      '& $content': {
        fontSize: typography.buttons.fontSizeLarge,
        lineHeight: typography.buttons.lineHeightLarge
      },

      '& $iconLeft': {
        marginLeft: '-0.5em'
      },

      '& $iconRight': {
        marginRight: '-0.5em'
      }
    },

    // variants
    primaryBlue: primary(
      palette.primary.main,
      palette.common.white,
      palette.grey.light!
    ),
    primaryRed: primary(
      palette.red.main,
      palette.common.white,
      palette.grey.light!
    ),
    primaryGreen: primary(
      palette.green.main,
      palette.common.white,
      palette.grey.light!
    ),

    secondaryBlue: secondary(
      palette.common.black,
      palette.common.white,
      palette.grey.lighter!,
      palette.grey.main!
    ),
    secondaryWhite: {
      color: palette.common.white,
      border: `solid ${sizes.borderWidth} ${alpha(palette.common.white, 0.32)}`,

      '&$focusVisible, &$focused': {
        // borderColor: palette.common.white,
        boxShadow: `0 0 0 3px ${alpha(palette.common.white, 0.48)}`
      },

      '&:hover, &$hovered': {
        borderColor: palette.common.white
      },

      '&:active, &$active': {
        backgroundColor: alpha(palette.common.white, 0.16),
        borderColor: palette.common.white
      },

      '&$disabled': {
        color: alpha(palette.common.white, 0.32),
        borderColor: alpha(palette.common.white, 0.32),
        backgroundColor: 'initial'
      }
    },

    flat: {
      ...secondary(
        palette.grey.dark!,
        palette.common.white,
        palette.grey.light!,
        alpha(palette.grey.dark!, 0.48)
      ),

      '&:hover, &$hovered': {
        backgroundColor: palette.grey.lighter
      },

      border: 'none'
    },

    transparent: {
      border: 'none',
      color: palette.common.white,

      '&$focusVisible, &$focused': {
        boxShadow: `0 0 0 3px ${alpha(palette.common.white, 0.48)}`
      },

      '&:hover, &$hovered': {
        backgroundColor: alpha(palette.common.white, 0.08)
      },

      '&:active, &$active': {
        backgroundColor: alpha(palette.common.white, 0.16)
      },

      '&$disabled': {
        color: alpha(palette.common.white, 0.48),
        backgroundColor: 'initial'
      }
    },

    // Other props
    fullWidth: {
      width: '100%'
    },
    hovered: {},
    focused: {},
    active: {
      boxShadow: 'none'
    },
    circular: {
      borderRadius: '50%',
      padding: 0
    },
    disabled: {},
    focusVisible: {},

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
