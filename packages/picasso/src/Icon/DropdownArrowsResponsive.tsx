import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import DropdownArrows16 from './DropdownArrows16'
import DropdownArrows24 from './DropdownArrows24'
import type { Props } from './DropdownArrows16'

const DropdownArrowsResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <DropdownArrows16 {...props} />,
    },
    <DropdownArrows24 {...props} />
  ) as JSX.Element
}

export default DropdownArrowsResponsive
