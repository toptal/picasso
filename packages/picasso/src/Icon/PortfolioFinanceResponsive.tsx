/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import PortfolioFinance16 from './PortfolioFinance16'
import PortfolioFinance24 from './PortfolioFinance24'
import type { Props } from './PortfolioFinance16'

const PortfolioFinanceResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <PortfolioFinance16 {...props} />,
    },
    <PortfolioFinance24 {...props} />
  ) as JSX.Element
}

export default PortfolioFinanceResponsive
