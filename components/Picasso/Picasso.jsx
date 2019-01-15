import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import PT from 'prop-types'

import pallete from './pallete'
import Provider from './PicassoProvider'

const picasso = {
  pallete,
  props: {
    MuiButtonBase: {
      disableRipple: true
    },
    MuiList: {
      disablePadding: true
    },
    MuiPaper: {
      square: true
    },
    MuiSelect: {
      disableUnderline: true
    }
  },
  shadows: Array.apply(null, Array(25)).map(() => 'none'), // Yest, this is needed as MUI expects 25 elements in array otherwise it raises error
  typography: {
    useNextVariants: true
  }
}

const PicassoProvider = new Provider(createMuiTheme(picasso))
const Picasso = ({ children }) => (
  <MuiThemeProvider theme={PicassoProvider.theme}>{children}</MuiThemeProvider>
)

Picasso.displayName = Picasso
Picasso.propTypes = {
  children: PT.node.isRequired
}

export { PicassoProvider }
export default Picasso
