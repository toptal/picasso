import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

const getHeadingMedium = (theme: Theme) => ({
  color: theme.palette.common.black,
  fontWeight: theme.typography.fontWeights.semibold,
  fontSize: '16px',
  lineHeight: '24px',
})

export const typographyStyles = (theme: Theme) => {
  const { palette, typography } = theme

  // All the body variants are mapped to the same MUI variant (body1) -> declaring styles via custom class names
  return createStyles({
    bodyXxsmall: {
      color: palette.text.primary,
      fontWeight: typography.fontWeights.regular,
      fontSize: typography.fontSizes.xxsmall,
      lineHeight: '16px',
    },
    bodyXsmall: {
      color: palette.text.primary,
      fontWeight: typography.fontWeights.regular,
      fontSize: typography.fontSizes.xsmall,
      lineHeight: '18px',
    },
    bodySmall: {
      color: palette.text.primary,
      fontWeight: typography.fontWeights.regular,
      fontSize: typography.fontSizes.small,
      lineHeight: '20px',
    },
    bodyMedium: {
      color: palette.text.primary,
      fontWeight: typography.fontWeights.regular,
      fontSize: typography.fontSizes.medium,
      lineHeight: '22px',
    },
    bodyLarge: {
      color: palette.common.black,
      fontWeight: typography.fontWeights.regular,
      fontSize: typography.fontSizes.large,
      lineHeight: '24px',
    },
    bodyInherit: {
      fontSize: '1em',
      lineHeight: '1.5em',
      fontWeight: typography.fontWeights.regular,
      color: palette.text.primary,
    },

    headingMedium: getHeadingMedium(theme),

    regular: {
      fontWeight: typography.fontWeights.regular,
    },
    semibold: {
      fontWeight: typography.fontWeights.semibold,
    },
    inheritWeight: {
      fontWeight: 'inherit',
    },

    green: {
      color: palette.green.dark,
    },
    red: {
      color: palette.red.main,
    },
    yellow: {
      color: palette.yellow.main,
    },
    lightGrey: {
      color: palette.grey.light2,
    },
    grey: {
      color: palette.grey.main,
    },
    'greyMain-2': {
      color: palette.grey.main2,
    },
    darkGrey: {
      color: palette.text.primary,
    },
    black: {
      color: palette.common.black,
    },
    lightBlue: {
      color: palette.blue.light,
    },
    invert: {
      color: palette.common.white,
    },
    inherit: {
      color: 'inherit',
    },
    blue: {
      color: palette.blue.main,
    },

    solid: {
      textDecoration: 'underline',
      textDecorationStyle: 'solid',
    },
    dashed: {
      textDecoration: 'underline',
      textDecorationStyle: 'dashed',
    },
    lineThrough: {
      textDecoration: 'line-through',
    },
  })
}
