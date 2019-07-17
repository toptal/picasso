import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles
} from '@material-ui/core/styles'
import React, { FunctionComponent, ReactNode, Fragment } from 'react'
import { createPortal } from 'react-dom'

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
  typography,
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
  }
}

const PicassoProvider = new Provider(createMuiTheme(picasso))

interface PicassoGlobalStylesProviderProps extends JssProps {
  children?: ReactNode
  root?: boolean
  id?: string
}

const PicassoGlobalStylesProvider = withStyles(globalStyles, {
  name: 'Picasso'
})((props: PicassoGlobalStylesProviderProps) => {
  const { classes, children, id } = props

  return (
    <div id={id} className={classes.root}>
      {children}
    </div>
  )
})

interface PicassoProps {
  children?: ReactNode
  root?: boolean
  /** Whether to load fonts file to the page */
  loadFonts?: boolean
  /** Whether to apply Picasso CSS reset */
  reset?: boolean
}

const Picasso: FunctionComponent<PicassoProps> = ({
  loadFonts,
  reset,
  children
}) => {
  const portalEl = document.getElementById('picasso-portal-root')

  return (
    <Fragment>
      <MuiThemeProvider theme={PicassoProvider.theme}>
        {loadFonts && <FontsLoader />}
        {reset && <CssBaseline />}
        <PicassoGlobalStylesProvider>{children}</PicassoGlobalStylesProvider>
      </MuiThemeProvider>
      {!portalEl &&
        createPortal(<div id='picasso-portal-root' />, document.body)}
    </Fragment>
  )
}

Picasso.defaultProps = {
  loadFonts: true,
  reset: true,
  root: false
}

export { PicassoProvider }
export default Picasso
