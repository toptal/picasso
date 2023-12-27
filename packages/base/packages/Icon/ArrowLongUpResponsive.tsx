/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ArrowLongUp16 from './ArrowLongUp16'
import ArrowLongUp24 from './ArrowLongUp24'
import type { Props } from './ArrowLongUp16'

const ArrowLongUpResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ArrowLongUp16 {...props} />,
    },
    <ArrowLongUp24 {...props} />
  ) as JSX.Element
}

export default ArrowLongUpResponsive
