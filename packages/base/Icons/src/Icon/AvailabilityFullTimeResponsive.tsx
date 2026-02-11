import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import AvailabilityFullTime16 from './AvailabilityFullTime16'
import AvailabilityFullTime24 from './AvailabilityFullTime24'
import type { Props } from './AvailabilityFullTime16'

const AvailabilityFullTimeResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <AvailabilityFullTime16 {...props} />,
    },
    <AvailabilityFullTime24 {...props} />
  ) as JSX.Element
}

export default AvailabilityFullTimeResponsive
