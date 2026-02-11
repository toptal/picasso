import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import BusinessOwnerJoin16 from './BusinessOwnerJoin16'
import BusinessOwnerJoin24 from './BusinessOwnerJoin24'
import type { Props } from './BusinessOwnerJoin16'

const BusinessOwnerJoinResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <BusinessOwnerJoin16 {...props} />,
    },
    <BusinessOwnerJoin24 {...props} />
  ) as JSX.Element
}

export default BusinessOwnerJoinResponsive
