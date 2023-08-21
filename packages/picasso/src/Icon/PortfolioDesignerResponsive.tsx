import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import PortfolioDesigner16 from './PortfolioDesigner16'
import PortfolioDesigner24 from './PortfolioDesigner24'
import type { Props } from './PortfolioDesigner16'

const PortfolioDesignerResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <PortfolioDesigner16 {...props} />,
    },
    <PortfolioDesigner24 {...props} />
  ) as JSX.Element
}

export default PortfolioDesignerResponsive
