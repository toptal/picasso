import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import BankWire16 from './BankWire16'
import BankWire24 from './BankWire24'
import type { Props } from './BankWire16'

const BankWireResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <BankWire16 {...props} />,
    },
    <BankWire24 {...props} />
  ) as JSX.Element
}

export default BankWireResponsive
