import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ pallete }) => ({
  MuiInputLabel: {
    outlined: {
      transform: 'translate(0.75em, 1em) scale(1)',

      '&$shrink': {
        transform: 'translate(0.85em, 0.6em) scale(.75)'
      }
    },

    shrink: {},

    error: {
      color: pallete.error.text
    }
  }
}))

export default {
  InputLabel: {}
}
