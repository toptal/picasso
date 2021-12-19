import { Theme, createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-provider'

import { toMuiVariant } from './utils'

const getHeadingMedium = (theme: Theme) => ({
  color: theme.palette.common.black,
  fontWeight: theme.typography.fontWeights.semibold,
  fontSize: '16px',
  lineHeight: '24px'
})

// TODO: https://toptal-core.atlassian.net/browse/FX-2166
PicassoProvider.override(theme => {
  const { palette, typography } = theme
  // Fundamental Typography styles across the MUI complex components
  // Ex. DatePicker has a MUITypography inside, the styles will be overriden to match BASE

  return {
    MuiTypography: {
      [toMuiVariant('heading', 'xlarge')]: {
        color: palette.common.black,
        fontWeight: typography.fontWeights.semibold,
        fontSize: '28px',
        lineHeight: '42px'
      },
      [toMuiVariant('heading', 'large')]: {
        color: palette.common.black,
        fontWeight: typography.fontWeights.semibold,
        fontSize: '20px',
        lineHeight: '30px'
      },
      [toMuiVariant('heading', 'medium')]: getHeadingMedium(theme),
      [toMuiVariant('heading', 'small')]: {
        color: palette.common.black,
        fontWeight: typography.fontWeights.semibold,
        fontSize: '14px',
        lineHeight: '22px'
      },
      [toMuiVariant('body', 'medium')]: {
        color: palette.text.primary,
        fontWeight: typography.fontWeights.regular,
        fontSize: '14px',
        lineHeight: '22px'
      }
    }
  }
})

export default (theme: Theme) => {
  const { palette, typography } = theme
  // All the body variants are mapped to the same MUI variant (body1) -> declaring styles via custom class names

  return createStyles({
    bodyXsmall: {
      color: palette.text.primary,
      fontWeight: typography.fontWeights.regular,
      fontSize: '11px',
      lineHeight: '16px'
    },
    bodySmall: {
      color: palette.text.primary,
      fontWeight: typography.fontWeights.regular,
      fontSize: '12px',
      lineHeight: '18px'
    },
    bodyMedium: {
      color: palette.text.primary,
      fontWeight: typography.fontWeights.regular,
      fontSize: '14px',
      lineHeight: '22px'
    },
    bodyLarge: {
      color: palette.common.black,
      fontWeight: typography.fontWeights.regular,
      fontSize: '16px',
      lineHeight: '24px'
    },
    bodyInherit: {
      fontSize: '1em',
      lineHeight: '1.5em',
      fontWeight: typography.fontWeights.regular,
      color: palette.text.primary
    },

    headingMedium: getHeadingMedium(theme),

    regular: {
      fontWeight: typography.fontWeights.regular
    },
    semibold: {
      fontWeight: typography.fontWeights.semibold
    },
    inheritWeight: {
      fontWeight: 'inherit'
    },

    green: {
      color: palette.green.dark
    },
    red: {
      color: palette.red.main
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
      color: palette.text.primary
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
}
