/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ScheduledPayment16 from './ScheduledPayment16'
import ScheduledPayment24 from './ScheduledPayment24'
import type { Props } from './ScheduledPayment16'

const ScheduledPaymentResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ScheduledPayment16 {...props} />,
    },
    <ScheduledPayment24 {...props} />
  ) as JSX.Element
}

export default ScheduledPaymentResponsive
