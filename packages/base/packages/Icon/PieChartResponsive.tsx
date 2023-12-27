/* eslint-disable import/no-extraneous-dependencies */
import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import PieChart16 from './PieChart16'
import PieChart24 from './PieChart24'
import type { Props } from './PieChart16'

const PieChartResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <PieChart16 {...props} />,
    },
    <PieChart24 {...props} />
  ) as JSX.Element
}

export default PieChartResponsive
