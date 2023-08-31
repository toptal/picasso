import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Afternoon16 from './Afternoon16'
import Afternoon24 from './Afternoon24'
import type { Props } from './Afternoon16'

const AfternoonResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Afternoon16 {...props} />,
    },
    <Afternoon24 {...props} />
  ) as JSX.Element
}

export default AfternoonResponsive
