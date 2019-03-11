import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles
} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import React from 'react'
import PropTypes from 'prop-types'

import {
  palette,
  layout,
  transitions,
  typography,
  spacing,
  breakpoints,
  screens
} from './config'
import FontsLoader from './FontsLoader'
import Provider from './PicassoProvider'
import globalStyles from './styles'

const picasso = {
  palette,
  layout,
  transitions,
  spacing,
  breakpoints,
  screens,
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
    MuiOutlinedInput: {
      notched: false
    }
  },
  typography: {
    useNextVariants: true,
    inputSize: '18px',
    ...typography
  }
}

const PicassoProvider = new Provider(createMuiTheme(picasso))

const PicassoGlobalStylesProvider = withStyles(globalStyles, {
  name: 'Picasso'
})(({ children, classes }) => <div className={classes.root}>{children}</div>)

const Picasso = ({ loadFonts = true, reset = true, ...rest }) => (
  <MuiThemeProvider theme={PicassoProvider.theme}>
    {loadFonts && <FontsLoader />}
    {reset && <CssBaseline />}
    <PicassoGlobalStylesProvider {...rest} />
  </MuiThemeProvider>
)

Picasso.propTypes = {
  children: PropTypes.node.isRequired,
  loadFonts: PropTypes.bool,
  reset: PropTypes.bool
}

Picasso.defaultProps = {
  loadFonts: true,
  reset: true
}

export { PicassoProvider }
export default Picasso
