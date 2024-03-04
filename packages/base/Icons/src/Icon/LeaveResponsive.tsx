import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Leave16 from './Leave16'
import Leave24 from './Leave24'
import type { Props } from './Leave16'

const LeaveResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Leave16 {...props} />,
    },
    <Leave24 {...props} />
  ) as JSX.Element
}

export default LeaveResponsive
