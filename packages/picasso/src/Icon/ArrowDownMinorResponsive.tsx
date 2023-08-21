import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ArrowDownMinor16 from './ArrowDownMinor16'
import ArrowDownMinor24 from './ArrowDownMinor24'
import type { Props } from './ArrowDownMinor16'

const ArrowDownMinorResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ArrowDownMinor16 {...props} />,
    },
    <ArrowDownMinor24 {...props} />
  ) as JSX.Element
}

export default ArrowDownMinorResponsive
