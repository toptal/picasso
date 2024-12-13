import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import PendingQueue16 from './PendingQueue16'
import PendingQueue24 from './PendingQueue24'
import type { Props } from './PendingQueue16'

const PendingQueueResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <PendingQueue16 {...props} />,
    },
    <PendingQueue24 {...props} />
  ) as JSX.Element
}

export default PendingQueueResponsive
