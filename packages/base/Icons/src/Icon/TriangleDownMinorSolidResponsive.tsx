import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import TriangleDownMinorSolid16 from './TriangleDownMinorSolid16'
import TriangleDownMinorSolid24 from './TriangleDownMinorSolid24'
import type { Props } from './TriangleDownMinorSolid16'

const TriangleDownMinorSolidResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <TriangleDownMinorSolid16 {...props} />,
    },
    <TriangleDownMinorSolid24 {...props} />
  ) as JSX.Element
}

export default TriangleDownMinorSolidResponsive
