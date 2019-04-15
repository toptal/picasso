import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ palette }: Theme) => ({
  MuiFormControlLabel: {
    root: {
      marginLeft: 0,
      marginRight: 0
    },
    label: {
      display: 'inline-flex',
      alignItems: 'center',

      color: palette.text.primary,
      lineHeight: '1em',
      fontWeight: 300,

      cursor: 'pointer',
      userSelect: 'none',

      '&$disabled': {
        cursor: 'not-allowed',
        pointerEvents: 'auto'
      }
    }
  }
}))

export default () =>
  createStyles({
    root: {},
    disabled: {}
  })
