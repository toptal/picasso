import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import React from 'react'

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
  responsive,
  environment = 'development',
  children,
  RootComponent = PicassoRootNode,
  titleCase,
  theme,
  disableTransitions,
}: PicassoLightProps) => {
  if (theme) {
    PicassoProvider.extendTheme(theme)
  }

  if (!responsive) {
    PicassoProvider.disableResponsiveStyle()
    PicassoBreakpoints.disableMobileBreakpoints()
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={PicassoProvider.theme}>
        <PicassoGlobalStylesProvider
          RootComponent={RootComponent}
          environment={environment}
          titleCase={titleCase}
          disableTransitions={disableTransitions}
        >
          {children}
        </PicassoGlobalStylesProvider>
      </ThemeProvider>
    </StyledEngineProvider>
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
