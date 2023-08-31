import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import CloseMinor16 from './CloseMinor16'
import CloseMinor24 from './CloseMinor24'
import type { Props } from './CloseMinor16'

const CloseMinorResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <CloseMinor16 {...props} />,
    },
    <CloseMinor24 {...props} />
  ) as JSX.Element
}

export default CloseMinorResponsive
