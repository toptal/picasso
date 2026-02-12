import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import SpecialGroupJoin16 from './SpecialGroupJoin16'
import SpecialGroupJoin24 from './SpecialGroupJoin24'
import type { Props } from './SpecialGroupJoin16'

const SpecialGroupJoinResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <SpecialGroupJoin16 {...props} />,
    },
    <SpecialGroupJoin24 {...props} />
  ) as JSX.Element
}

export default SpecialGroupJoinResponsive
