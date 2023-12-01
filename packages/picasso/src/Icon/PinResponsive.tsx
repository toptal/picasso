/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Pin16 from './Pin16'
import Pin24 from './Pin24'
import type { Props } from './Pin16'

const PinResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Pin16 {...props} />,
    },
    <Pin24 {...props} />
  ) as JSX.Element
}

export default PinResponsive
