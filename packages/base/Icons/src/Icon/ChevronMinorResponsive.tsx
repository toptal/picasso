import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ChevronMinor16 from './ChevronMinor16'
import ChevronMinor24 from './ChevronMinor24'
import type { Props } from './ChevronMinor16'

const ChevronMinorResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ChevronMinor16 {...props} />,
    },
    <ChevronMinor24 {...props} />
  ) as JSX.Element
}

export default ChevronMinorResponsive
