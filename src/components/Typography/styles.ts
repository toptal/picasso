import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(() => ({
  MuiTypography: {
    root: {
      lineHeight: '1.5em !important'
    }
  }
}))

export default ({ palette }: Theme) =>
  createStyles({
    // weight
    thin: {
      fontWeight: 100
    },
    light: {
      fontWeight: 300
    },
    regular: {
      fontWeight: 400
    },
    semibold: {
      fontWeight: 600
    },
    bold: {
      fontWeight: 700
    },

    // colors
    green: {
      color: palette.success.main
    },
    red: {
      color: palette.error.main
    },
    blue: {
      color: palette.primary.main
    },
    grey: {
      color: palette.text.primary
    },
    black: {
      color: palette.common.black
    },
    invert: {
      color: palette.common.white
    },

    // variants
    bodySmall: {
      fontSize: '12px'
    },
    bodyMedium: {
      fontSize: '14px'
    },
    bodyLarge: {
      fontSize: '16px'
    },
    headerSmall: {
      fontSize: '14px',
      fontWeight: 600
    },
    headerMedium: {
      fontSize: '16px',
      fontWeight: 600
    },
    headerLarge: {
      fontSize: '20px',
      fontWeight: 600
    },
    tableHeadMedium: {
      fontSize: '12px',
      fontWeight: 600
    },
    tableTextMedium: {
      fontSize: '13px'
    },
    hintMedium: {
      fontSize: '11px'
    },
    errorMedium: {
      fontSize: '11px',
      color: palette.error.main
    }
  })
