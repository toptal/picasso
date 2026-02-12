import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import AvgWeeklySpend16 from './AvgWeeklySpend16'
import AvgWeeklySpend24 from './AvgWeeklySpend24'
import type { Props } from './AvgWeeklySpend16'

const AvgWeeklySpendResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <AvgWeeklySpend16 {...props} />,
    },
    <AvgWeeklySpend24 {...props} />
  ) as JSX.Element
}

export default AvgWeeklySpendResponsive
