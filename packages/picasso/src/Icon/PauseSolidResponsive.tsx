import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import PauseSolid16 from './PauseSolid16'
import PauseSolid24 from './PauseSolid24'
import type { Props } from './PauseSolid16'

const PauseSolidResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <PauseSolid16 {...props} />,
    },
    <PauseSolid24 {...props} />
  ) as JSX.Element
}

export default PauseSolidResponsive
