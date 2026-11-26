import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Network16 from './Network16'
import Network24 from './Network24'
import type { Props } from './Network16'

const NetworkResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Network16 {...props} />,
    },
    <Network24 {...props} />
  ) as React.ReactElement
}

export default NetworkResponsive
