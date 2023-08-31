import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import VerificationBadge16 from './VerificationBadge16'
import VerificationBadge24 from './VerificationBadge24'
import type { Props } from './VerificationBadge16'

const VerificationBadgeResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <VerificationBadge16 {...props} />,
    },
    <VerificationBadge24 {...props} />
  ) as JSX.Element
}

export default VerificationBadgeResponsive
