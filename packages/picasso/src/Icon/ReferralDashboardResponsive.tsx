/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ReferralDashboard16 from './ReferralDashboard16'
import ReferralDashboard24 from './ReferralDashboard24'
import type { Props } from './ReferralDashboard16'

const ReferralDashboardResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ReferralDashboard16 {...props} />,
    },
    <ReferralDashboard24 {...props} />
  ) as JSX.Element
}

export default ReferralDashboardResponsive
