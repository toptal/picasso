import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Bell16 from './Bell16'
import Bell24 from './Bell24'
import type { Props } from './Bell16'

const BellResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Bell16 {...props} />,
    },
    <Bell24 {...props} />
  ) as JSX.Element
}

export default BellResponsive
