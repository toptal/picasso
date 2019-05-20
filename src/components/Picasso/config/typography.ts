declare module '@material-ui/core/styles/createTypography' {
  export interface Typography {
    buttons: {
      fontSizeSmall: string
      fontSizeMedium: string
      fontSizeLarge: string
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
  inputSize: '18px',
  buttons: {
    fontSizeSmall: '12px',
    fontSizeMedium: '13px',
    fontSizeLarge: '15px'
  }
}

export default typography
