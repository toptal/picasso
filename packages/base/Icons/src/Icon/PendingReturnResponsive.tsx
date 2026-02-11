import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import PendingReturn16 from './PendingReturn16'
import PendingReturn24 from './PendingReturn24'
import type { Props } from './PendingReturn16'

const PendingReturnResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <PendingReturn16 {...props} />,
    },
    <PendingReturn24 {...props} />
  ) as JSX.Element
}

export default PendingReturnResponsive
