/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Calendar16 from './Calendar16'
import Calendar24 from './Calendar24'
import type { Props } from './Calendar16'

const CalendarResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Calendar16 {...props} />,
    },
    <Calendar24 {...props} />
  ) as JSX.Element
}

export default CalendarResponsive
