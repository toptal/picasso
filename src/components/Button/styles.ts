import { Theme, createStyles } from '@material-ui/core/styles'
import { Palette } from '@material-ui/core/styles/createPalette'

const ICON_SPACING = '0.4em'

const primary = (palette: Palette) => ({
  border: 'none',
  color: palette.common.white,
  backgroundImage:
    'linear-gradient(-180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)',

  '&:hover, &$hovered': {
    backgroundImage:
      'linear-gradient(-180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%)'
  },

  '&:active, &$active': {
    backgroundImage:
      'linear-gradient(-180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%)'
  }
})

const secondary = () => ({
  backgroundImage:
    'linear-gradient(-180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 100%)',

  '&:hover, &$hovered': {
    backgroundImage:
      'linear-gradient(-180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.8) 100%)'
  },

  '&:active, &$active': {
    backgroundImage:
      'linear-gradient(-180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.8) 100%)'
  }
})

const color = (color: string) => ({
  backgroundColor: color,
  color
})

export default ({ palette, spacing, transitions }: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      textTransform: 'none',
      borderRadius: spacing.borderRadius,
      border: `solid ${spacing.borderWidth} ${palette.grey[100]}`,
      fontSize: 'inherit',
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

    // colors
    blue: color(palette.primary.main),
    green: color(palette.success.main),
    red: color(palette.error.main),
    disabled: color(palette.grey[100]),

    // variants
    primary: primary(palette),
    secondary: secondary(),
    flat: {
      ...color(palette.common.black),
      ...secondary(),
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
