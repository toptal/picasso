/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import CalendarReminder16 from './CalendarReminder16'
import CalendarReminder24 from './CalendarReminder24'
import type { Props } from './CalendarReminder16'

const CalendarReminderResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <CalendarReminder16 {...props} />,
    },
    <CalendarReminder24 {...props} />
  ) as JSX.Element
}

export default CalendarReminderResponsive
