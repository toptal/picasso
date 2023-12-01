/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ArrowLongRight16 from './ArrowLongRight16'
import ArrowLongRight24 from './ArrowLongRight24'
import type { Props } from './ArrowLongRight16'

const ArrowLongRightResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ArrowLongRight16 {...props} />,
    },
    <ArrowLongRight24 {...props} />
  ) as JSX.Element
}

export default ArrowLongRightResponsive
