/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Referral16 from './Referral16'
import Referral24 from './Referral24'
import type { Props } from './Referral16'

const ReferralResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Referral16 {...props} />,
    },
    <Referral24 {...props} />
  ) as JSX.Element
}

export default ReferralResponsive
