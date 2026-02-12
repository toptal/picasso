import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Returned16 from './Returned16'
import Returned24 from './Returned24'
import type { Props } from './Returned16'

const ReturnedResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Returned16 {...props} />,
    },
    <Returned24 {...props} />
  ) as JSX.Element
}

export default ReturnedResponsive
