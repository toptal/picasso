import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import TimeConvert16 from './TimeConvert16'
import TimeConvert24 from './TimeConvert24'
import type { Props } from './TimeConvert16'

const TimeConvertResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <TimeConvert16 {...props} />,
    },
    <TimeConvert24 {...props} />
  ) as JSX.Element
}

export default TimeConvertResponsive
