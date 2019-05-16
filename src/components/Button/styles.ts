import { Theme, createStyles } from '@material-ui/core/styles'

import { darken } from '../styles'

const ICON_SPACING = '0.4em'

const getFilledButton = (
  backgroundColor: string,
  borderColor: string,
  color: string
) => ({
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

export default ({ palette, spacing, transitions }: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      textTransform: 'none',
      borderRadius: spacing.borderRadius,
      fontSize: 'inherit',
      transition: `all ${transitions.duration.short}ms ${
        transitions.easing.easeOut
      }`,
      transitionProperty: 'border, color, background',
      border: `solid ${spacing.borderWidth} ${palette.grey[50]}`,
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
    content: {
      lineHeight: '1.5em'
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
