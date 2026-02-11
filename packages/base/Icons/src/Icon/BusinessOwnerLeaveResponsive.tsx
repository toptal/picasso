import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import BusinessOwnerLeave16 from './BusinessOwnerLeave16'
import BusinessOwnerLeave24 from './BusinessOwnerLeave24'
import type { Props } from './BusinessOwnerLeave16'

const BusinessOwnerLeaveResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <BusinessOwnerLeave16 {...props} />,
    },
    <BusinessOwnerLeave24 {...props} />
  ) as JSX.Element
}

export default BusinessOwnerLeaveResponsive
