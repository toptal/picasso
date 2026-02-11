import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ManagerChange16 from './ManagerChange16'
import ManagerChange24 from './ManagerChange24'
import type { Props } from './ManagerChange16'

const ManagerChangeResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ManagerChange16 {...props} />,
    },
    <ManagerChange24 {...props} />
  ) as JSX.Element
}

export default ManagerChangeResponsive
