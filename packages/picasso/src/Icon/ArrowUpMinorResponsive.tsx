/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ArrowUpMinor16 from './ArrowUpMinor16'
import ArrowUpMinor24 from './ArrowUpMinor24'
import type { Props } from './ArrowUpMinor16'

const ArrowUpMinorResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ArrowUpMinor16 {...props} />,
    },
    <ArrowUpMinor24 {...props} />
  ) as JSX.Element
}

export default ArrowUpMinorResponsive
