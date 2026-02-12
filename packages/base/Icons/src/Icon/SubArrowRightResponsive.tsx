import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import SubArrowRight16 from './SubArrowRight16'
import SubArrowRight24 from './SubArrowRight24'
import type { Props } from './SubArrowRight16'

const SubArrowRightResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <SubArrowRight16 {...props} />,
    },
    <SubArrowRight24 {...props} />
  ) as JSX.Element
}

export default SubArrowRightResponsive
