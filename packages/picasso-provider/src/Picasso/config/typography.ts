import type { Typography } from '@material-ui/core/styles/createTypography'

export interface AdditionalTypography {
  buttons: {
    fontSizeSmall: string
    lineHeightSmall: string
    fontSizeMedium: string
    lineHeightMedium: string
    fontSizeLarge: string
    lineHeightLarge: string
  }
  fontWeights: {
    thin: number
    light: number
    regular: number
    semibold: number
  }
  fontSizes: {
    xxsmall: string
    xsmall: string
    small: string
    medium: string
    large: string
  }
}

declare module '@material-ui/core/styles/createTypography' {
  export interface Typography extends AdditionalTypography {}

  export interface FontStyle {
    inputSize: string
  }
}

const typography: AdditionalTypography & Partial<Typography> = {
  fontFamily: ['proxima-nova', 'Arial', 'sans-serif'].join(','),
  fontSize: 16,
  fontWeights: {
    thin: 100,
    light: 300,
    regular: 400,
    semibold: 600,
  },
  inputSize: '18px',
  buttons: {
    fontSizeSmall: '12px',
    lineHeightSmall: '15px',
    fontSizeMedium: '13px',
    lineHeightMedium: '16px',
    fontSizeLarge: '15px',
    lineHeightLarge: '18px',
  },
  fontSizes: {
    xxsmall: '11px',
    xsmall: '12px',
    small: '13px',
    medium: '14px',
    large: '16px',
  },
}

export default typography
