import { Theme } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

const setBorderColor = (borderColor: string) => ({
  '&:before': {
    borderColor
  }
})

const setCircleColor = (borderColor: string) => ({
  '&:after': {
    borderColor,
    display: 'block'
  }
})

const createColorVariant = (mainColor: string, disabledColor: string) => ({
  '&$checked': {
    ...setBorderColor(mainColor),
    ...setCircleColor(mainColor)
  },
  '&$disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
    pointerEvents: 'auto' as 'auto',
    ...setBorderColor(disabledColor)
  },
  '&:hover': {
    ...setBorderColor(mainColor)
  }
})

PicassoProvider.override(({ palette, transitions }) => ({
  MuiRadio: {
    root: {
      fontSize: '16px',
      position: 'relative' as 'relative',
      width: '1em',
      height: '1em',
      padding: '0',

      margin: '0.25em 0.5em',
      ...createColorVariant(palette.primary.main, palette.grey[200]),
      animationDuration: `${transitions.duration.short}`,
      animationTimingFunction: transitions.easing.easeIn,
      transitionDuration: `${transitions.duration.short}`,
      transitionTimingFunction: transitions.easing.easeOut
    },
    colorSecondary: createColorVariant(palette.grey[200], palette.grey[200]),
    disabled: createColorVariant(palette.grey[200], palette.grey[200]),

    checked: {}
  }
}))

const centeredCircle = (palette: any) => ({
  position: 'absolute' as 'absolute',
  width: '100%',
  height: '100%',
  top: '50%',
  left: '50%',
  borderRadius: '50%',
  transform: 'translate(-50%, -50%)',
  content: '""',
  borderColor: 'inherit',
  background: palette.common.white,
  pointerEvents: 'none' as 'none',
  transition: 'border-color',
  transitionDuration: 'inherit',
  transitionTimingFunction: 'inherit'
})

export default ({ palette }: Theme) => ({
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
      ...centeredCircle(palette),
      border: `1px solid ${palette.common.black}`
    },
    '&:after': {
      ...centeredCircle(palette),
      width: 'initial',
      height: 'initial',
      borderWidth: '0.25em',
      borderStyle: 'solid',
      display: 'none',
      animation: 'fade-in',
      animationDuration: 'inherit',
      animationTimingFunction: 'inherit'
    }
  }
})
