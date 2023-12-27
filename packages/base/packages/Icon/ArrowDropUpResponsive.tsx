/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ArrowDropUp16 from './ArrowDropUp16'
import ArrowDropUp24 from './ArrowDropUp24'
import type { Props } from './ArrowDropUp16'

const ArrowDropUpResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ArrowDropUp16 {...props} />,
    },
    <ArrowDropUp24 {...props} />
  ) as JSX.Element
}

export default ArrowDropUpResponsive
