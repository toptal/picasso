import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import MissedCall16 from './MissedCall16'
import MissedCall24 from './MissedCall24'
import type { Props } from './MissedCall16'

const MissedCallResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <MissedCall16 {...props} />,
    },
    <MissedCall24 {...props} />
  ) as JSX.Element
}

export default MissedCallResponsive
