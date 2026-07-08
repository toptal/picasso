import React from 'react'

import CssBaseline from '../../CssBaseline'
import { PicassoBreakpoints } from '../config'
import type { PicassoProps } from '../Picasso'
import PicassoRootNode from '../PicassoRootNode'
import PicassoGlobalStylesProvider from '../PicassoGlobalStylesProvider'

type PicassoLightProps = Omit<
  PicassoProps,
  'loadFavicon' | 'loadFonts' | 'fixViewport' | 'notificationsContainer'
>

const PicassoLight = ({
  reset = true,
  responsive = true,
  environment = 'development',
  children,
  RootComponent = PicassoRootNode,
  titleCase,
  disableTransitions,
}: PicassoLightProps) => {
  if (!responsive) {
    PicassoBreakpoints.disableMobileBreakpoints()
  }

  return (
    <PicassoGlobalStylesProvider
      RootComponent={RootComponent}
      environment={environment}
      titleCase={titleCase}
      disableTransitions={disableTransitions}
      responsive={responsive}
    >
      {reset && <CssBaseline />}
      {children}
    </PicassoGlobalStylesProvider>
  )
}

export default PicassoLight
