import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Shield16 from './Shield16'
import Shield24 from './Shield24'
import type { Props } from './Shield16'

const ShieldResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Shield16 {...props} />,
    },
    <Shield24 {...props} />
  ) as JSX.Element
}

export default ShieldResponsive