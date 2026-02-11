import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import TriangleUpMinorSolid16 from './TriangleUpMinorSolid16'
import TriangleUpMinorSolid24 from './TriangleUpMinorSolid24'
import type { Props } from './TriangleUpMinorSolid16'

const TriangleUpMinorSolidResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <TriangleUpMinorSolid16 {...props} />,
    },
    <TriangleUpMinorSolid24 {...props} />
  ) as JSX.Element
}

export default TriangleUpMinorSolidResponsive
