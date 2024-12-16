import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Location16 from './Location16'
import Location24 from './Location24'
import type { Props } from './Location16'

const LocationResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Location16 {...props} />,
    },
    <Location24 {...props} />
  ) as JSX.Element
}

export default LocationResponsive
