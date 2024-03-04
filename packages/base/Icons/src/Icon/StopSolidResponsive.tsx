import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import StopSolid16 from './StopSolid16'
import StopSolid24 from './StopSolid24'
import type { Props } from './StopSolid16'

const StopSolidResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <StopSolid16 {...props} />,
    },
    <StopSolid24 {...props} />
  ) as JSX.Element
}

export default StopSolidResponsive
