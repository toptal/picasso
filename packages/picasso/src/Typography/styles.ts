import { Theme, createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-shared'

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
    h4: {
      lineHeight: '1.5em'
    },
    body1: {
      lineHeight: '1.5em'
    }
  }
}))

export default ({ palette, typography }: Theme) =>
  createStyles({
    // variants
    bodySmall: {
      fontSize: '12px',
      fontWeight: typography.fontWeights.regular,
      color: palette.text.secondary
    },
    bodyMedium: {
      fontSize: '14px',
      fontWeight: typography.fontWeights.regular,
      color: palette.text.secondary
    },
    bodyLarge: {
      fontSize: '16px',
      fontWeight: typography.fontWeights.regular,
      color: palette.text.secondary
    },
    bodyInherit: {
      fontSize: '1em',
      fontWeight: typography.fontWeights.regular,
      color: palette.text.secondary
    },
    headingSmall: {
      fontSize: '14px',
      fontWeight: typography.fontWeights.semibold,
      color: palette.text.primary
    },
    headingMedium: {
      fontSize: '16px',
      fontWeight: typography.fontWeights.semibold,
      color: palette.text.primary
    },
    headingLarge: {
      fontSize: '20px',
      fontWeight: typography.fontWeights.semibold,
      color: palette.text.primary
    },
    headingXlarge: {
      fontSize: '28px',
      fontWeight: typography.fontWeights.semibold,
      color: palette.text.primary
    },

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
    inheritWeight: {
      fontWeight: 'inherit'
    },

    // colors
    green: {
      color: palette.green.main
    },
    red: {
      color: palette.red.main
    },
    blue: {
      color: palette.primary.main
    },
    yellow: {
      color: palette.yellow.main
    },
    lightGrey: {
      color: palette.grey.light2
    },
    grey: {
      color: palette.grey.main
    },
    darkGrey: {
      color: palette.text.secondary
    },
    black: {
      color: palette.common.black
    },
    invert: {
      color: palette.common.white
    },
    inherit: {
      color: 'inherit'
    },

    // Text decorations
    solid: {
      textDecoration: 'underline',
      textDecorationStyle: 'solid'
    },
    dashed: {
      textDecoration: 'underline',
      textDecorationStyle: 'dashed'
    },
    lineThrough: {
      textDecoration: 'line-through'
    }
  })
