import { Breakpoints } from '@material-ui/core/styles/createBreakpoints'

declare module '@material-ui/core/styles/createBreakpoints' {
  interface Breakpoints {
    smallScreen: () => string
  }
}

const breakpoints: Partial<Breakpoints> = {
  values: {
    xs: 0,
    sm: 672,
    md: 1168,
    lg: 1280,
    xl: 1920
  },

  smallScreen: function () {
    return this.down!('sm')
  }
}

export default breakpoints
