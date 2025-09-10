import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import CertificationBadge16 from './CertificationBadge16'
import CertificationBadge24 from './CertificationBadge24'
import type { Props } from './CertificationBadge16'

const CertificationBadgeResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <CertificationBadge16 {...props} />,
    },
    <CertificationBadge24 {...props} />
  ) as JSX.Element
}

export default CertificationBadgeResponsive
