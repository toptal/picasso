import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Mobile16 from './Mobile16'
import Mobile24 from './Mobile24'
import type { Props } from './Mobile16'

const MobileResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Mobile16 {...props} />,
    },
    <Mobile24 {...props} />
  ) as JSX.Element
}

export default MobileResponsive
