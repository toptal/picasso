import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import NumericalAnalysis16 from './NumericalAnalysis16'
import NumericalAnalysis24 from './NumericalAnalysis24'
import type { Props } from './NumericalAnalysis16'

const NumericalAnalysisResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <NumericalAnalysis16 {...props} />,
    },
    <NumericalAnalysis24 {...props} />
  ) as JSX.Element
}

export default NumericalAnalysisResponsive
