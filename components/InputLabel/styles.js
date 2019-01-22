import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ palette }) => ({
  MuiInputLabel: {
    outlined: {
      transform: 'translate(0.75em, 1em) scale(1)',

      '&$shrink': {
        transform: 'translate(0.85em, 0.6em) scale(.75)'
      }
    },

    shrink: {},

    error: {
      color: palette.error.main
    }
  }
}))

export default {
  InputLabel: {}
}
