import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ pallete }) => ({
  MuiFormControlLabel: {
    root: {
      fontSize: `${2 * pallete.unit}px`,
      marginLeft: 0,
      marginRight: 0
    },
    label: {
      display: 'inline-flex',
      alignItems: 'center',

      color: pallete.text.primary,
      lineHeight: `${2 * pallete.unit}px`,
      fontFamily: 'proxima-nova',
      fontWeight: 300,
      fontSize: '1em',
      marginLeft: '0.5em',

      cursor: 'pointer',
      userSelect: 'none',

      '&$disabled': {
        cursor: 'not-allowed',
        pointerEvents: 'auto'
      }
    }
  }
}))

export default {
  FormControlLabel: {}
}
