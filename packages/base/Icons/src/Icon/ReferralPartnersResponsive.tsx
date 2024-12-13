import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ReferralPartners16 from './ReferralPartners16'
import ReferralPartners24 from './ReferralPartners24'
import type { Props } from './ReferralPartners16'

const ReferralPartnersResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ReferralPartners16 {...props} />,
    },
    <ReferralPartners24 {...props} />
  ) as JSX.Element
}

export default ReferralPartnersResponsive
