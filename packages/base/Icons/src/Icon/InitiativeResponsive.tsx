import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Initiative16 from './Initiative16'
import Initiative24 from './Initiative24'
import type { Props } from './Initiative16'

const InitiativeResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Initiative16 {...props} />,
    },
    <Initiative24 {...props} />
  ) as JSX.Element
}

export default InitiativeResponsive
