import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Chef16 from './Chef16'
import Chef24 from './Chef24'
import type { Props } from './Chef16'

const ChefResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Chef16 {...props} />,
    },
    <Chef24 {...props} />
  ) as JSX.Element
}

export default ChefResponsive
