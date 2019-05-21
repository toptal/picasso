import { Theme, createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(() => ({
  MuiTypography: {
    h1: {
      lineHeight: '1.5em'
    },
    h2: {
      lineHeight: '1.5em'
    },
    h3: {
      lineHeight: '1.5em'
    },
    body1: {
      lineHeight: '1.5em'
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
    bodyInherit: {
      fontSize: '1em'
    },
    headingSmall: {
      fontSize: '14px',
      fontWeight: 600
    },
    headingMedium: {
      fontSize: '16px',
      fontWeight: 600
    },
    headingLarge: {
      fontSize: '20px',
      fontWeight: 600
    }
  })
