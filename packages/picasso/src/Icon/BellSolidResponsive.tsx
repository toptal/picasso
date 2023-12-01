/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import BellSolid16 from './BellSolid16'
import BellSolid24 from './BellSolid24'
import type { Props } from './BellSolid16'

const BellSolidResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <BellSolid16 {...props} />,
    },
    <BellSolid24 {...props} />
  ) as JSX.Element
}

export default BellSolidResponsive
