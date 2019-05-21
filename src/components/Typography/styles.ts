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

export default ({ palette, typography }: Theme) =>
  createStyles({
    // weight
    thin: {
      fontWeight: typography.fontWeights.thin
    },
    light: {
      fontWeight: typography.fontWeights.light
    },
    regular: {
      fontWeight: typography.fontWeights.regular
    },
    semibold: {
      fontWeight: typography.fontWeights.semibold
    },
    bold: {
      fontWeight: typography.fontWeights.bold
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
      fontWeight: typography.fontWeights.semibold
    },
    headingMedium: {
      fontSize: '16px',
      fontWeight: typography.fontWeights.semibold
    },
    headingLarge: {
      fontSize: '20px',
      fontWeight: typography.fontWeights.semibold
    }
  })
