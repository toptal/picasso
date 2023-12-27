/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import StarSolid16 from './StarSolid16'
import StarSolid24 from './StarSolid24'
import type { Props } from './StarSolid16'

const StarSolidResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <StarSolid16 {...props} />,
    },
    <StarSolid24 {...props} />
  ) as JSX.Element
}

export default StarSolidResponsive
