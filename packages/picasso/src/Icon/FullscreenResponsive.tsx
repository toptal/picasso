/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Fullscreen16 from './Fullscreen16'
import Fullscreen24 from './Fullscreen24'
import type { Props } from './Fullscreen16'

const FullscreenResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Fullscreen16 {...props} />,
    },
    <Fullscreen24 {...props} />
  ) as JSX.Element
}

export default FullscreenResponsive
