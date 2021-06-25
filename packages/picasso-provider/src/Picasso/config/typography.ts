declare module '@material-ui/core/styles/createTypography' {
  export interface Typography {
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
      bold: number
    }
  }

  export interface FontStyle {
    inputSize: string
  }
}

const typography = {
  fontFamily: ['proxima-nova', 'Arial', 'sans-serif'].join(','),
  fontSize: 16,
  fontWeights: {
    thin: 100,
    light: 300,
    regular: 400,
    semibold: 600
  },
  inputSize: '18px',
  buttons: {
    fontSizeSmall: '12px',
    lineHeightSmall: '15px',
    fontSizeMedium: '13px',
    lineHeightMedium: '16px',
    fontSizeLarge: '15px',
    lineHeightLarge: '18px'
  }
}

export default typography
