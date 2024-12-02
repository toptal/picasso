import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Expand16 from './Expand16'
import Expand24 from './Expand24'
import type { Props } from './Expand16'

const ExpandResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Expand16 {...props} />,
    },
    <Expand24 {...props} />
  ) as JSX.Element
}

export default ExpandResponsive
