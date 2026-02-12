import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import HoursThisMonth16 from './HoursThisMonth16'
import HoursThisMonth24 from './HoursThisMonth24'
import type { Props } from './HoursThisMonth16'

const HoursThisMonthResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <HoursThisMonth16 {...props} />,
    },
    <HoursThisMonth24 {...props} />
  ) as JSX.Element
}

export default HoursThisMonthResponsive
