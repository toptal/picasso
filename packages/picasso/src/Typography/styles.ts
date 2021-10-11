import { Theme, createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-provider'

import { toMuiVariant } from './utils'

PicassoProvider.override(({ palette, typography }) => ({
  // If typography variant has a unique mui variant mapping, you should override styles here
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
    [toMuiVariant('heading', 'medium')]: {
      color: palette.common.black,
      fontWeight: typography.fontWeights.semibold,
      fontSize: '16px',
      lineHeight: '24px'
    },
    [toMuiVariant('heading', 'small')]: {
      color: palette.common.black,
      fontWeight: typography.fontWeights.semibold,
      fontSize: '14px',
      lineHeight: '22px'
    },
    // base body1 styles across the Picasso library
    [toMuiVariant('body', 'medium')]: {
      color: palette.text.primary,
      fontWeight: typography.fontWeights.regular,
      fontSize: '14px',
      lineHeight: '22px'
    }
  }
}))

export default ({ palette, typography }: Theme) =>
  // If there is no unique MUI variant for typography, you should override styles here
  createStyles({
    // bodySmall & bodyMedium & bodyLarge -> body1
    bodySmall: {
      color: palette.text.primary,
      fontWeight: typography.fontWeights.regular,
      fontSize: '12px',
      lineHeight: '18px'
    },
    // bodyMedium has base body1 styles, no need to override
    bodyMedium: {},
    bodyLarge: {
      color: palette.common.black,
      fontWeight: typography.fontWeights.regular,
      fontSize: '16px',
      lineHeight: '24px'
    },
    // body inherit does not have an appropriate MUI variant, overriding styles here
    bodyInherit: {
      fontSize: '1em',
      lineHeight: '1.5em',
      fontWeight: typography.fontWeights.regular,
      color: palette.text.primary
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
