import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Performance16 from './Performance16'
import Performance24 from './Performance24'
import type { Props } from './Performance16'

const PerformanceResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Performance16 {...props} />,
    },
    <Performance24 {...props} />
  ) as JSX.Element
}

export default PerformanceResponsive
