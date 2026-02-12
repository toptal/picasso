import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import GrammarCheck16 from './GrammarCheck16'
import GrammarCheck24 from './GrammarCheck24'
import type { Props } from './GrammarCheck16'

const GrammarCheckResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <GrammarCheck16 {...props} />,
    },
    <GrammarCheck24 {...props} />
  ) as JSX.Element
}

export default GrammarCheckResponsive
