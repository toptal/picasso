import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Wifi16 from './Wifi16'
import Wifi24 from './Wifi24'
import type { Props } from './Wifi16'

const WifiResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Wifi16 {...props} />,
    },
    <Wifi24 {...props} />
  ) as JSX.Element
}

export default WifiResponsive
