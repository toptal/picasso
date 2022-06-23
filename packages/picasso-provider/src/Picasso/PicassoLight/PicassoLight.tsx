import {
  MuiThemeProvider,
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles'
import React from 'react'

import CssBaseline from '../../CssBaseline'
import { generateRandomStringOrGetEmptyInTest } from '../utils'
import { PicassoBreakpoints } from '../config'
import PicassoProvider from '../PicassoProvider'
import { PicassoProps } from '../Picasso'
import PicassoRootNode from '../PicassoRootNode'
import PicassoGlobalStylesProvider from '../PicassoGlobalStylesProvider'

type PicassoLightProps = Omit<
  PicassoProps,
  'loadFavicon' | 'loadFonts' | 'fixViewport' | 'notificationsContainer'
>

const PicassoLight = ({
  reset,
  responsive,
  environment = 'development',
  children,
  RootComponent = PicassoRootNode,
  titleCase,
  theme,
  disableTransitions,
  disableClassNamePrefix,
  injectFirst,
}: PicassoLightProps) => {
  if (theme) {
    PicassoProvider.extendTheme(theme)
  }

  if (!responsive) {
    PicassoProvider.disableResponsiveStyle()
    PicassoBreakpoints.disableMobileBreakpoints()
  }

  const generateClassName = createGenerateClassName({
    // if there are multiples instances of Picasso
    // on the page we want each set of styles to be unique
    seed: disableClassNamePrefix ? '' : generateRandomStringOrGetEmptyInTest(),
  })

  return (
    <StylesProvider
      generateClassName={generateClassName}
      injectFirst={injectFirst}
    >
      <MuiThemeProvider theme={PicassoProvider.theme}>
        <PicassoGlobalStylesProvider
          RootComponent={RootComponent}
          environment={environment}
          titleCase={titleCase}
          disableTransitions={disableTransitions}
        >
          {reset && <CssBaseline />}
          {children}
        </PicassoGlobalStylesProvider>
      </MuiThemeProvider>
    </StylesProvider>
  )
}

PicassoLight.defaultProps = {
  environment: 'development',
  responsive: true,
  reset: true,
  injectFirst: undefined,
  RootComponent: PicassoRootNode,
}

export default PicassoLight
