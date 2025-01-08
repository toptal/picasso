import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Dashboard16 from './Dashboard16'
import Dashboard24 from './Dashboard24'
import type { Props } from './Dashboard16'

const DashboardResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Dashboard16 {...props} />,
    },
    <Dashboard24 {...props} />
  ) as JSX.Element
}

export default DashboardResponsive
