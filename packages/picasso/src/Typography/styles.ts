import { Theme, createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-provider'

import { toMuiVariant } from './utils'

PicassoProvider.override(({ typography }) => ({
  MuiTypography: {
    [toMuiVariant('heading', 'xlarge')]: {
      fontWeight: typography.fontWeights.semibold,
      fontSize: '28px',
      lineHeight: '42px'
    },
    [toMuiVariant('heading', 'large')]: {
      fontWeight: typography.fontWeights.semibold,
      fontSize: '20px',
      lineHeight: '30px'
    },
    [toMuiVariant('heading', 'medium')]: {
      fontWeight: typography.fontWeights.semibold,
      fontSize: '16px',
      lineHeight: '24px'
    },
    [toMuiVariant('heading', 'small')]: {
      fontWeight: typography.fontWeights.semibold,
      fontSize: '14px',
      lineHeight: '22px'
    },
    [toMuiVariant('body', 'small')]: {
      fontWeight: typography.fontWeights.regular,
      fontSize: '12px',
      lineHeight: '18px'
    },
    [toMuiVariant('body', 'medium')]: {
      fontWeight: typography.fontWeights.regular,
      fontSize: '14px',
      lineHeight: '22px'
    },
    [toMuiVariant('body', 'large')]: {
      fontWeight: typography.fontWeights.regular,
      fontSize: '16px',
      lineHeight: '24px'
    }
  }
}))

export default ({ palette, typography }: Theme) =>
  createStyles({
    bodySmall: {
      color: palette.text.primary
    },
    bodyMedium: {
      color: palette.text.primary
    },
    bodyLarge: {
      color: palette.common.black
    },
    bodyInherit: {
      fontSize: '1em',
      fontWeight: typography.fontWeights.regular,
      color: palette.text.primary
    },
    headingSmall: {
      color: palette.common.black
    },
    headingMedium: {
      color: palette.common.black
    },
    headingLarge: {
      color: palette.common.black
    },
    headingXlarge: {
      color: palette.common.black
    },

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

    green: {
      color: palette.green.darker
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
