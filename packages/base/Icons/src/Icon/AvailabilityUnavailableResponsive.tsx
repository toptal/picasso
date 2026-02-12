import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import AvailabilityUnavailable16 from './AvailabilityUnavailable16'
import AvailabilityUnavailable24 from './AvailabilityUnavailable24'
import type { Props } from './AvailabilityUnavailable16'

const AvailabilityUnavailableResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <AvailabilityUnavailable16 {...props} />,
    },
    <AvailabilityUnavailable24 {...props} />
  ) as JSX.Element
}

export default AvailabilityUnavailableResponsive
