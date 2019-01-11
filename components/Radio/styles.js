import { PicassoProvider } from '../Picasso'

const setBorderColor = borderColor => ({
  '&:before': {
    borderColor
  }
})

const setCircleColor = borderColor => ({
  '&:after': {
    borderColor,
    display: 'block'
  }
})

const createColorVariant = color => ({
  '&$checked': {
    ...setBorderColor(color),
    ...setCircleColor(color)
  },
  '&$disabled': {
    opacity: '0.5'
  },
  '&:hover': {
    ...setBorderColor(color)
  }
})

PicassoProvider.override(({ pallete, transitions }) => ({
  MuiRadio: {
    root: {
      fontSize: '18px',
      position: 'relative',
      width: '1em',
      height: '1em',
      padding: '0',

      margin: '0.25em 0.5em',
      ...createColorVariant(pallete.grey[100]),
      animationDuration: transitions.duration.short,
      animationTimingFunction: transitions.easing.easeIn,
      transitionDuration: transitions.duration.short,
      transitionTimingFunction: transitions.easing.easeOut
    },
    colorPrimary: createColorVariant(pallete.primary.main),
    colorSecondary: createColorVariant(pallete.primary.main), // secondary is set to primary by purpose
    disabled: createColorVariant(pallete.grey[100]),

    checked: {}
  }
}))

const centeredCircle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: '50%',
  left: '50%',
  borderRadius: '50%',
  transform: 'translate(-50%, -50%)',
  content: '""',
  borderColor: 'inherit',
  background: '#fff',
  pointerEvents: 'none',
  transition: 'border-color',
  transitionDuration: 'inherit',
  transitionTimingFunction: 'inherit'
}

export default {
  Radio: {
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
        ...centeredCircle,
        border: '1px solid #000'
      },
      '&:after': {
        ...centeredCircle,
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
  }
}
