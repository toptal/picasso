import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import WarningSolid16 from './WarningSolid16'
import WarningSolid24 from './WarningSolid24'
import type { Props } from './WarningSolid16'

const WarningSolidResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <WarningSolid16 {...props} />,
    },
    <WarningSolid24 {...props} />
  ) as JSX.Element
}

export default WarningSolidResponsive
