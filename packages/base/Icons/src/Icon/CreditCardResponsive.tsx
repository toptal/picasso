import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import CreditCard16 from './CreditCard16'
import CreditCard24 from './CreditCard24'
import type { Props } from './CreditCard16'

const CreditCardResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <CreditCard16 {...props} />,
    },
    <CreditCard24 {...props} />
  ) as JSX.Element
}

export default CreditCardResponsive
