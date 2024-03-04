import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Referrals16 from './Referrals16'
import Referrals24 from './Referrals24'
import type { Props } from './Referrals16'

const ReferralsResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Referrals16 {...props} />,
    },
    <Referrals24 {...props} />
  ) as JSX.Element
}

export default ReferralsResponsive
