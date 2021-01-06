import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { alpha, outline, mix, StandardProps } from '@toptal/picasso-shared'

const ICON_SPACING = '0.5em'

const styles = ({ palette, sizes, transitions, typography }: Theme) => {
  const createPrimaryVariant = (mainColor: string) => ({
    border: 'none',
    color: palette.common.white,
    backgroundColor: mainColor,

    '&:hover, &$hovered': {
      backgroundColor: mix(mainColor, palette.common.white, 0.152)
    },

    '&:active, &$active': {
      backgroundColor: mix(mainColor, palette.common.black, 0.172)
    },

    '&$disabled': {
      backgroundColor: palette.grey.light2
    }
  })

  return createStyles({
    root: {
      position: 'relative',
      textTransform: 'none',
      borderRadius: sizes.borderRadius.small,
      border: `solid ${sizes.borderWidth} ${palette.grey.light2}`,
      fontSize: '1rem',
      transition: `all ${transitions.duration.short}ms ${transitions.easing.easeOut}`,
      transitionProperty: 'border, color, background',
      boxShadow: 'none',
      flexShrink: 0,

      '&$focusVisible, &$focused': {
        ...outline(palette.primary.main)
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
    primary: createPrimaryVariant(palette.primary.main),
    negative: createPrimaryVariant(palette.red.main),
    positive: createPrimaryVariant(palette.green.main),

    secondary: {
      color: palette.common.black,
      backgroundColor: palette.common.white,

      '&:hover, &$hovered': {
        borderColor: palette.common.black
      },

      '&:active, &$active': {
        backgroundColor: palette.grey.lighter2,
        borderColor: palette.common.black
      },

      '&$disabled': {
        color: palette.grey.main,
        borderColor: palette.grey.main,
        backgroundColor: palette.common.white
      }
    },

    transparent: {
      color: palette.common.white,
      border: `solid ${sizes.borderWidth} ${alpha(palette.common.white, 0.32)}`,

      '&$focusVisible, &$focused': {
        ...outline(palette.common.white)
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

    // Other props
    fullWidth: {
      width: '100%'
    },
    hovered: {},
    focused: {},
    active: {
      boxShadow: 'none'
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
}

const useStyles = makeStyles<Theme, Pick<StandardProps, 'classes'>>(styles, {
  name: 'PicassoButton'
})

export default useStyles
