/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import TriangleLeftMinorSolid16 from './TriangleLeftMinorSolid16'
import TriangleLeftMinorSolid24 from './TriangleLeftMinorSolid24'
import type { Props } from './TriangleLeftMinorSolid16'

const TriangleLeftMinorSolidResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <TriangleLeftMinorSolid16 {...props} />,
    },
    <TriangleLeftMinorSolid24 {...props} />
  ) as JSX.Element
}

export default TriangleLeftMinorSolidResponsive
