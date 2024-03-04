import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Switch16 from './Switch16'
import Switch24 from './Switch24'
import type { Props } from './Switch16'

const SwitchResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Switch16 {...props} />,
    },
    <Switch24 {...props} />
  ) as JSX.Element
}

export default SwitchResponsive
