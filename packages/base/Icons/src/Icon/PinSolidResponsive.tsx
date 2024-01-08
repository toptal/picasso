import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import PinSolid16 from './PinSolid16'
import PinSolid24 from './PinSolid24'
import type { Props } from './PinSolid16'

const PinSolidResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <PinSolid16 {...props} />,
    },
    <PinSolid24 {...props} />
  ) as JSX.Element
}

export default PinSolidResponsive
