import { Theme, createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-shared'

PicassoProvider.override(({ palette, typography }: Theme) => ({
  MuiFormControlLabel: {
    root: {
      marginLeft: 0,
      marginRight: 0
    },
    label: {
      display: 'inline-flex',
      alignItems: 'center',

      fontSize: '1em',
      color: palette.text.primary,
      lineHeight: '1.5em',
      fontWeight: typography.fontWeightRegular,
      cursor: 'pointer',
      userSelect: 'none',

      '&$disabled': {
        cursor: 'not-allowed',
        pointerEvents: 'auto'
      }
    }
  }
}))

export default ({ palette, typography }: Theme) =>
  createStyles({
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      cursor: 'pointer',
      // For ellipsis
      maxWidth: '100%',
      // For correct alignment with the text.
      verticalAlign: 'middle',
      WebkitTapHighlightColor: 'transparent',
      // marginLeft: -11,
      // marginRight: 16, // used for row presentation of radio/checkbox
      '&$disabled': {
        cursor: 'default'
      },
      marginLeft: 0,
      marginRight: 0
    },
    label: {
      display: 'inline-block',

      fontSize: '1em',
      color: palette.text.primary,
      lineHeight: '1em',
      fontWeight: typography.fontWeightRegular,
      cursor: 'pointer',
      userSelect: 'none',

      '&$disabled': {
        cursor: 'not-allowed',
        pointerEvents: 'auto'
      }
    },
    disabled: {}
  })
