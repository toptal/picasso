import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import BellOff16 from './BellOff16'
import BellOff24 from './BellOff24'
import type { Props } from './BellOff16'

const BellOffResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <BellOff16 {...props} />,
    },
    <BellOff24 {...props} />
  ) as JSX.Element
}

export default BellOffResponsive
