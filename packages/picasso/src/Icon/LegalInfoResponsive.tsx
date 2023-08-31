import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import LegalInfo16 from './LegalInfo16'
import LegalInfo24 from './LegalInfo24'
import type { Props } from './LegalInfo16'

const LegalInfoResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <LegalInfo16 {...props} />,
    },
    <LegalInfo24 {...props} />
  ) as JSX.Element
}

export default LegalInfoResponsive
