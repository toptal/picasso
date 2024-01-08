import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Dispute16 from './Dispute16'
import Dispute24 from './Dispute24'
import type { Props } from './Dispute16'

const DisputeResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Dispute16 {...props} />,
    },
    <Dispute24 {...props} />
  ) as JSX.Element
}

export default DisputeResponsive
