declare module '@material-ui/core/styles/createTypography' {
  export interface Typography {
    buttons: {
      fontSizeSmall: string
      fontSizeMedium: string
      fontSizeLarge: string
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
  useNextVariants: true,
  fontFamily: ['proxima-nova', 'Arial', 'sans-serif'].join(','),
  fontSize: 16,
  fontWeights: {
    thin: 100,
    light: 200,
    regular: 400,
    semibold: 600,
    bold: 700
  },
  inputSize: '18px',
  buttons: {
    fontSizeSmall: '12px',
    fontSizeMedium: '13px',
    fontSizeLarge: '15px'
  }
}

export default typography
