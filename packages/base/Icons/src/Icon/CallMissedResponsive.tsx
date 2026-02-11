import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import CallMissed16 from './CallMissed16'
import CallMissed24 from './CallMissed24'
import type { Props } from './CallMissed16'

const CallMissedResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <CallMissed16 {...props} />,
    },
    <CallMissed24 {...props} />
  ) as JSX.Element
}

export default CallMissedResponsive
