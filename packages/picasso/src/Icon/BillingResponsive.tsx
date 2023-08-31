import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Billing16 from './Billing16'
import Billing24 from './Billing24'
import type { Props } from './Billing16'

const BillingResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Billing16 {...props} />,
    },
    <Billing24 {...props} />
  ) as JSX.Element
}

export default BillingResponsive
