import * as React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

export const picassoTheme = {
  pallete: {
    primary: {
      main: '#204ecf'
    },
    secondary: {
      main: '#00cc83'
    },
    grey: {
      50: '#dfe3e9',
      100: '#686869'
    }
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  },
  shadows: Array.apply(null, Array(25)).map(() => 'none'),
  typography: {
    useNextVariants: true
  }
}

export class PicassoTheme {
  constructor () {
    this.theme = picassoTheme
  }

  overrides (cb = () => {}) {
    this.theme = {
      ...this.theme,
      overrides: {
        ...this.theme.overrides,
        ...cb({ theme: this.theme })
      }
    }
  }
}

const adapter = new PicassoTheme()
const muiTheme = (adapter) => createMuiTheme({
  ...adapter.theme
})

export const withPicasso = (Component) =>
  (props) => (
    <MuiThemeProvider theme={muiTheme(adapter)}>
      <Component {...props} />
    </MuiThemeProvider>
  )

export default adapter
