import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Rotate16 from './Rotate16'
import Rotate24 from './Rotate24'
import type { Props } from './Rotate16'

const RotateResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Rotate16 {...props} />,
    },
    <Rotate24 {...props} />
  ) as JSX.Element
}

export default RotateResponsive
