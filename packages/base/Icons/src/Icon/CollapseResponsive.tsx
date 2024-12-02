import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Collapse16 from './Collapse16'
import Collapse24 from './Collapse24'
import type { Props } from './Collapse16'

const CollapseResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Collapse16 {...props} />,
    },
    <Collapse24 {...props} />
  ) as JSX.Element
}

export default CollapseResponsive
