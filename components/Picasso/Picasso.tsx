import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles
} from '@material-ui/core/styles'
import React, { FunctionComponent, ReactNode } from 'react'

import CssBaseline from '../CssBaseline'
import {
  palette,
  layout,
  transitions,
  typography,
  spacing,
  breakpoints,
  screens,
  shadows
} from './config'
import FontsLoader from './FontsLoader'
import Provider from './PicassoProvider'
import globalStyles from './styles'
import { JssProps } from './types'

const picasso = {
  palette,
  layout,
  transitions,
  spacing,
  breakpoints,
  screens,
  shadows,
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

interface PicassoGlobalStylesProviderProps extends JssProps {
  children?: ReactNode
}

const PicassoGlobalStylesProvider = withStyles(globalStyles, {
  name: 'Picasso'
})((props: PicassoGlobalStylesProviderProps) => {
  const { classes, children } = props

  return <div className={classes.root}>{children}</div>
})

interface PicassoProps {
  children?: ReactNode
  loadFonts?: boolean
  reset?: boolean
}

const Picasso: FunctionComponent<PicassoProps> = ({
  loadFonts,
  reset,
  children
}) => (
  <MuiThemeProvider theme={PicassoProvider.theme}>
    {loadFonts && <FontsLoader />}
    {reset && <CssBaseline />}
    <PicassoGlobalStylesProvider>{children}</PicassoGlobalStylesProvider>
  </MuiThemeProvider>
)

Picasso.defaultProps = {
  loadFonts: true,
  reset: true
}

export { PicassoProvider }
export default Picasso
