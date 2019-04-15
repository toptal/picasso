import { CSSProperties } from '@material-ui/core/styles/withStyles'

declare module '@material-ui/core/styles/createTypography' {
  export interface FontStyle
    extends Required<{
      fontFamily: CSSProperties['fontFamily']
      fontSize: number
      fontWeightLight: CSSProperties['fontWeight']
      fontWeightRegular: CSSProperties['fontWeight']
      fontWeightMedium: CSSProperties['fontWeight']
    }> {
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
