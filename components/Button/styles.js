import { darken } from '../styles'

const ICON_SPACING = '0.4em'
const getFilledButton = (backgroundColor, borderColor, color) => ({
  backgroundColor,
  borderColor,
  color,

  '&:hover, &$hovered': {
    backgroundColor: darken(backgroundColor, 0.05)
  },

  '&:active, &$active': {
    backgroundColor: darken(backgroundColor, 0.25),
    borderColor: darken(backgroundColor, 0.25)
  }
})

export default ({ palette, typography, transitions }) => ({
  root: {
    position: 'relative',
    textTransform: 'none',
    fontSize: typography.button.fontSize,
    padding: '.4em 1em',
    borderRadius: '.25rem',
    lineHeight: '1.5em',
    transition: `all ${transitions.duration.short}ms ${
      transitions.easing.easeOut
    }`,
    transitionProperty: 'border, color, background',
    border: `solid 1px ${palette.grey[50]}`,
    backgroundColor: palette.grey[50],

    '&:hover, &$hovered': {
      backgroundColor: darken(palette.grey[50], 0.05)
    },

    '&[disabled]': {
      opacity: 0.45
    },

    '&:focus, &$focused': {
      textDecoration: 'underline',

      '&:active, &$active, &:hover': {
        textDecoration: 'none'
      }
    },

    '&:active, &$active': {
      backgroundColor: darken(palette.grey[50], 0.15)
    },

    '&+&': {
      marginLeft: '0.5em'
    }
  },
  loader: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },

  // sizes
  small: {
    fontSize: '0.8rem'
  },
  large: {
    fontSize: '1.2rem'
  },

  // Variants
  primary: getFilledButton(
    palette.primary.main,
    palette.primary.main,
    palette.common.white
  ),
  secondary: {
    ...getFilledButton(
      'transparent',
      palette.primary.main,
      palette.primary.main
    ),

    '&:hover, &$hovered': {
      backgroundColor: palette.primary.light,
      borderColor: palette.primary.main
    },

    '&:active, &$active': {
      backgroundColor: darken(palette.primary.light, 0.25),
      borderColor: darken(palette.primary.light, 0.25)
    }
  },
  success: getFilledButton(
    palette.success.main,
    palette.success.main,
    palette.common.white
  ),
  error: getFilledButton(
    palette.error.main,
    palette.error.main,
    palette.common.white
  ),
  flat: {
    ...getFilledButton(
      palette.common.white,
      palette.grey[50],
      palette.text.primary
    ),
    border: 'none'
  },
  basic: getFilledButton(
    palette.common.white,
    palette.grey[50],
    palette.text.primary
  ),

  // Other props
  fullWidth: {
    width: '100%'
  },
  hovered: {},
  focused: {},
  active: {},

  // Child elements
  icon: {
    fontSize: '1.2em !important',
    marginTop: '0.1em',
    verticalAlign: 'top'
  },
  iconLeft: {
    marginRight: ICON_SPACING
  },
  iconRight: {
    marginLeft: ICON_SPACING
  },
  children: {
    display: 'inline-block'
  },
  hidden: {
    opacity: 0
  }
})
