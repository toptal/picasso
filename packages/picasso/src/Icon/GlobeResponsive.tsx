import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Globe16 from './Globe16'
import Globe24 from './Globe24'
import type { Props } from './Globe16'

const GlobeResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Globe16 {...props} />,
    },
    <Globe24 {...props} />
  ) as JSX.Element
}

export default GlobeResponsive
