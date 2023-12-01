/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import PartTime16 from './PartTime16'
import PartTime24 from './PartTime24'
import type { Props } from './PartTime16'

const PartTimeResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <PartTime16 {...props} />,
    },
    <PartTime24 {...props} />
  ) as JSX.Element
}

export default PartTimeResponsive
