import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import TimeSolid16 from './TimeSolid16'
import TimeSolid24 from './TimeSolid24'
import type { Props } from './TimeSolid16'

const TimeSolidResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <TimeSolid16 {...props} />,
    },
    <TimeSolid24 {...props} />
  ) as JSX.Element
}

export default TimeSolidResponsive
