import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Cake16 from './Cake16'
import Cake24 from './Cake24'
import type { Props } from './Cake16'

const CakeResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Cake16 {...props} />,
    },
    <Cake24 {...props} />
  ) as JSX.Element
}

export default CakeResponsive
