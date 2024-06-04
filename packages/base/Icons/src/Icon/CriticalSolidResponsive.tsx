import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import CriticalSolid16 from './CriticalSolid16'
import CriticalSolid24 from './CriticalSolid24'
import type { Props } from './CriticalSolid16'

const CriticalSolidResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <CriticalSolid16 {...props} />,
    },
    <CriticalSolid24 {...props} />
  ) as JSX.Element
}

export default CriticalSolidResponsive
