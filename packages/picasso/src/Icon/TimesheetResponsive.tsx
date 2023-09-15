import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Timesheet16 from './Timesheet16'
import Timesheet24 from './Timesheet24'
import type { Props } from './Timesheet16'

const TimesheetResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Timesheet16 {...props} />,
    },
    <Timesheet24 {...props} />
  ) as JSX.Element
}

export default TimesheetResponsive
