import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import AvgWeeklyHours16 from './AvgWeeklyHours16'
import AvgWeeklyHours24 from './AvgWeeklyHours24'
import type { Props } from './AvgWeeklyHours16'

const AvgWeeklyHoursResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <AvgWeeklyHours16 {...props} />,
    },
    <AvgWeeklyHours24 {...props} />
  ) as JSX.Element
}

export default AvgWeeklyHoursResponsive
