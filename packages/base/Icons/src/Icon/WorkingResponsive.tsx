import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Working16 from './Working16'
import Working24 from './Working24'
import type { Props } from './Working16'

const WorkingResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Working16 {...props} />,
    },
    <Working24 {...props} />
  ) as JSX.Element
}

export default WorkingResponsive
