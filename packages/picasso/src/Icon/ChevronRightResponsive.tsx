import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ChevronRight16 from './ChevronRight16'
import ChevronRight24 from './ChevronRight24'
import type { Props } from './ChevronRight16'

const ChevronRightResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ChevronRight16 {...props} />,
    },
    <ChevronRight24 {...props} />
  ) as JSX.Element
}

export default ChevronRightResponsive
