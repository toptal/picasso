import MUIRadio from '@material-ui/core/Radio'

import { PicassoProvider } from '../../components/Picasso'

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

export default MUIRadio
