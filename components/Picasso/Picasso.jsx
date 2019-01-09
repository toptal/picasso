import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import PT from 'prop-types'
import Button from '../Button/styles'
import TextField from '../TextField/styles'

const picasso = createMuiTheme({
  pallete: {

  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  },
  shadows: Array.apply(null, Array(25)).map(() => 'none'), // Yest, this is needed as MUI expects 25 elements in array otherwise it raises error
  typography: {
    useNextVariants: true
  },
  overrides: {
    ...Button,
    ...TextField
  }
})

const Picasso = ({ children }) => (
  <MuiThemeProvider theme={picasso}>
    {children}
  </MuiThemeProvider>
)

Picasso.displayName = Picasso
Picasso.propTypes = {
  children: PT.node.isRequired
}

export default Picasso
