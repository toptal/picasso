import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'
import { createPropertiesStyles, rem } from '../styles'

PicassoProvider.override(({ palette, transitions }) => ({
  MuiRadio: {
    root: {
      color: palette.grey[200],
      fontSize: '1rem',
      position: 'relative',
      width: '1em',
      height: '1em',
      padding: '0',
      margin: '0.25em 0.5em 0.25em 0',
      animationDuration: `${transitions.duration.short}`,
      animationTimingFunction: transitions.easing.easeIn,
      transitionDuration: `${transitions.duration.short}`,
      transitionTimingFunction: transitions.easing.easeOut,

      '&$checked': {
        color: palette.primary.main,

        // show centered circle inside the radio circle
        '&:after': {
          display: 'block'
        }
      },
      '&$disabled': {
        opacity: 0.32,
        cursor: 'not-allowed',
        pointerEvents: 'auto'
      },
      '&:not($disabled):hover': {
        color: palette.primary.main
      }
    }
  }
}))

const centeredCircle = (backgroundColor: string) =>
  createPropertiesStyles({
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '50%',
    left: '50%',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    content: '""',
    borderColor: 'inherit',
    background: backgroundColor,
    pointerEvents: 'none',
    transition: 'border-color',
    transitionDuration: 'inherit',
    transitionTimingFunction: 'inherit'
  })

export default ({ palette, spacing }: Theme) =>
  createStyles({
    '@keyframes fade-in': {
      '0%': {
        opacity: 0
      },
      '100%': {
        opacity: 1
      }
    },
    icon: {
      '&:before': {
        ...centeredCircle(palette.common.white),
        border: `${spacing.borderWidth} solid ${palette.grey[200]}`
      },
      '&:after': {
        ...centeredCircle(palette.common.white),
        width: 'initial',
        height: 'initial',
        borderWidth: rem('3px'),
        borderStyle: 'solid',
        display: 'none',
        animation: 'fade-in',
        animationDuration: 'inherit',
        animationTimingFunction: 'inherit'
      }
    },
    label: {
      marginRight: '0.5em'
    }
  })
