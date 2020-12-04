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
        pointerEvents: 'auto'
      }
    }
  }
}))

export default () =>
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
      '&$disabled': {
        cursor: 'default'
      },
      marginLeft: 0,
      marginRight: 0
    },
    label: {
      '&$disabled': {
        pointerEvents: 'auto'
      }
    },
    disabled: {}
  })
