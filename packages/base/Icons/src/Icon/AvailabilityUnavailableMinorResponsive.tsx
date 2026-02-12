import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import AvailabilityUnavailableMinor16 from './AvailabilityUnavailableMinor16'
import AvailabilityUnavailableMinor24 from './AvailabilityUnavailableMinor24'
import type { Props } from './AvailabilityUnavailableMinor16'

const AvailabilityUnavailableMinorResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <AvailabilityUnavailableMinor16 {...props} />,
    },
    <AvailabilityUnavailableMinor24 {...props} />
  ) as JSX.Element
}

export default AvailabilityUnavailableMinorResponsive
