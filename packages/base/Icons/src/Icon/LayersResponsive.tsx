import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Layers16 from './Layers16'
import Layers24 from './Layers24'
import type { Props } from './Layers16'

const LayersResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Layers16 {...props} />,
    },
    <Layers24 {...props} />
  ) as JSX.Element
}

export default LayersResponsive
