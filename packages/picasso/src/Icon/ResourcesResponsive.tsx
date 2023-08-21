import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Resources16 from './Resources16'
import Resources24 from './Resources24'
import type { Props } from './Resources16'

const ResourcesResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Resources16 {...props} />,
    },
    <Resources24 {...props} />
  ) as JSX.Element
}

export default ResourcesResponsive
