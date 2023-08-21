import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Pause16 from './Pause16'
import Pause24 from './Pause24'
import type { Props } from './Pause16'

const PauseResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Pause16 {...props} />,
    },
    <Pause24 {...props} />
  ) as JSX.Element
}

export default PauseResponsive
