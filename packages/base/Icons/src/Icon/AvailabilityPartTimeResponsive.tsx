import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import AvailabilityPartTime16 from './AvailabilityPartTime16'
import AvailabilityPartTime24 from './AvailabilityPartTime24'
import type { Props } from './AvailabilityPartTime16'

const AvailabilityPartTimeResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <AvailabilityPartTime16 {...props} />,
    },
    <AvailabilityPartTime24 {...props} />
  ) as JSX.Element
}

export default AvailabilityPartTimeResponsive
