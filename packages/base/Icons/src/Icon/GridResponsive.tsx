import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Grid16 from './Grid16'
import Grid24 from './Grid24'
import type { Props } from './Grid16'

const GridResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Grid16 {...props} />,
    },
    <Grid24 {...props} />
  ) as React.ReactElement
}

export default GridResponsive
