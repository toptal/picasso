import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import TriangleRightMinorSolid16 from './TriangleRightMinorSolid16'
import TriangleRightMinorSolid24 from './TriangleRightMinorSolid24'
import type { Props } from './TriangleRightMinorSolid16'

const TriangleRightMinorSolidResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <TriangleRightMinorSolid16 {...props} />,
    },
    <TriangleRightMinorSolid24 {...props} />
  ) as JSX.Element
}

export default TriangleRightMinorSolidResponsive
