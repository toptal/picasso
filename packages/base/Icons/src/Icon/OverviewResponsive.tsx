import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Overview16 from './Overview16'
import Overview24 from './Overview24'
import type { Props } from './Overview16'

const OverviewResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Overview16 {...props} />,
    },
    <Overview24 {...props} />
  ) as JSX.Element
}

export default OverviewResponsive
