import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import SpecialGroupLeave16 from './SpecialGroupLeave16'
import SpecialGroupLeave24 from './SpecialGroupLeave24'
import type { Props } from './SpecialGroupLeave16'

const SpecialGroupLeaveResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <SpecialGroupLeave16 {...props} />,
    },
    <SpecialGroupLeave24 {...props} />
  ) as JSX.Element
}

export default SpecialGroupLeaveResponsive
