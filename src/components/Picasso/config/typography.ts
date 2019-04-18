declare module '@material-ui/core/styles/createTypography' {
  export interface FontStyle {
    inputSize: string
  }
}

const typography = {
  useNextVariants: true,
  fontFamily: ['proxima-nova', 'Arial', 'sans-serif'].join(','),
  fontSize: 16,
  inputSize: '18px',

  button: {
    fontSize: '16px'
  }
}

export default typography
