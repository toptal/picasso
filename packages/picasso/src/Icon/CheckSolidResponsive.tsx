import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import CheckSolid16 from './CheckSolid16'
import CheckSolid24 from './CheckSolid24'
import type { Props } from './CheckSolid16'

const CheckSolidResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <CheckSolid16 {...props} />,
    },
    <CheckSolid24 {...props} />
  ) as JSX.Element
}

export default CheckSolidResponsive
