import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import CheckMinor16 from './CheckMinor16'
import CheckMinor24 from './CheckMinor24'
import type { Props } from './CheckMinor16'

const CheckMinorResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <CheckMinor16 {...props} />,
    },
    <CheckMinor24 {...props} />
  ) as JSX.Element
}

export default CheckMinorResponsive
