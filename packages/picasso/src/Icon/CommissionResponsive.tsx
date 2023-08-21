import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Commission16 from './Commission16'
import Commission24 from './Commission24'
import type { Props } from './Commission16'

const CommissionResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Commission16 {...props} />,
    },
    <Commission24 {...props} />
  ) as JSX.Element
}

export default CommissionResponsive
