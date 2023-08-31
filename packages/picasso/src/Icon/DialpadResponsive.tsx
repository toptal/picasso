import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Dialpad16 from './Dialpad16'
import Dialpad24 from './Dialpad24'
import type { Props } from './Dialpad16'

const DialpadResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Dialpad16 {...props} />,
    },
    <Dialpad24 {...props} />
  ) as JSX.Element
}

export default DialpadResponsive
