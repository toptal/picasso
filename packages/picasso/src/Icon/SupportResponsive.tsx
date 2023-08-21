import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Support16 from './Support16'
import Support24 from './Support24'
import type { Props } from './Support16'

const SupportResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Support16 {...props} />,
    },
    <Support24 {...props} />
  ) as JSX.Element
}

export default SupportResponsive
