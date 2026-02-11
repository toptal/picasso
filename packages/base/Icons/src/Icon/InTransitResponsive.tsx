import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import InTransit16 from './InTransit16'
import InTransit24 from './InTransit24'
import type { Props } from './InTransit16'

const InTransitResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <InTransit16 {...props} />,
    },
    <InTransit24 {...props} />
  ) as JSX.Element
}

export default InTransitResponsive
