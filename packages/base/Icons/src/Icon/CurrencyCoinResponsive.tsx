import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import CurrencyCoin16 from './CurrencyCoin16'
import CurrencyCoin24 from './CurrencyCoin24'
import type { Props } from './CurrencyCoin16'

const CurrencyCoinResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <CurrencyCoin16 {...props} />,
    },
    <CurrencyCoin24 {...props} />
  ) as JSX.Element
}

export default CurrencyCoinResponsive
