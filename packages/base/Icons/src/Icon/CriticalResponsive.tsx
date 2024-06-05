import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Critical16 from './Critical16'
import Critical24 from './Critical24'
import type { Props } from './Critical16'

const CriticalResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Critical16 {...props} />,
    },
    <Critical24 {...props} />
  ) as JSX.Element
}

export default CriticalResponsive
