import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Employee16 from './Employee16'
import Employee24 from './Employee24'
import type { Props } from './Employee16'

const EmployeeResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Employee16 {...props} />,
    },
    <Employee24 {...props} />
  ) as JSX.Element
}

export default EmployeeResponsive
