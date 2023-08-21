import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ReferralBonus16 from './ReferralBonus16'
import ReferralBonus24 from './ReferralBonus24'
import type { Props } from './ReferralBonus16'

const ReferralBonusResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ReferralBonus16 {...props} />,
    },
    <ReferralBonus24 {...props} />
  ) as JSX.Element
}

export default ReferralBonusResponsive
