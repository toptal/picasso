import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Control16 from './Control16'
import Control24 from './Control24'
import type { Props } from './Control16'

const ControlResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Control16 {...props} />,
    },
    <Control24 {...props} />
  ) as JSX.Element
}

export default ControlResponsive
