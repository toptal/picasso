import React from 'react'

import { PicassoBreakpoints } from '../config'
import type { PicassoProps } from '../Picasso'
import PicassoRootNode from '../PicassoRootNode'
import PicassoGlobalStylesProvider from '../PicassoGlobalStylesProvider'

type PicassoLightProps = Omit<
  PicassoProps,
  | 'loadFavicon'
  | 'loadFonts'
  | 'fixViewport'
  | 'notificationContainer'
  | 'disableHelmet'
>

const PicassoLight = ({
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
      {children}
    </PicassoGlobalStylesProvider>
  )
}

export default PicassoLight
