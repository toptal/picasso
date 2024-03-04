import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Check16 from './Check16'
import Check24 from './Check24'
import type { Props } from './Check16'

const CheckResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Check16 {...props} />,
    },
    <Check24 {...props} />
  ) as JSX.Element
}

export default CheckResponsive
