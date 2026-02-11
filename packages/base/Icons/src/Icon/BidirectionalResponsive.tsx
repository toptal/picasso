import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Bidirectional16 from './Bidirectional16'
import Bidirectional24 from './Bidirectional24'
import type { Props } from './Bidirectional16'

const BidirectionalResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Bidirectional16 {...props} />,
    },
    <Bidirectional24 {...props} />
  ) as JSX.Element
}

export default BidirectionalResponsive
