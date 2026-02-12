import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Failed16 from './Failed16'
import Failed24 from './Failed24'
import type { Props } from './Failed16'

const FailedResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Failed16 {...props} />,
    },
    <Failed24 {...props} />
  ) as JSX.Element
}

export default FailedResponsive
