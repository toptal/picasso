import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Bulb16 from './Bulb16'
import Bulb24 from './Bulb24'
import type { Props } from './Bulb16'

const BulbResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Bulb16 {...props} />,
    },
    <Bulb24 {...props} />
  ) as JSX.Element
}

export default BulbResponsive
