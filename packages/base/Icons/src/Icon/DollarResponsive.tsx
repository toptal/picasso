import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Dollar16 from './Dollar16'
import Dollar24 from './Dollar24'
import type { Props } from './Dollar16'

const DollarResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Dollar16 {...props} />,
    },
    <Dollar24 {...props} />
  ) as JSX.Element
}

export default DollarResponsive
