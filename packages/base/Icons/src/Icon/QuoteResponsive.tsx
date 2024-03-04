import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Quote16 from './Quote16'
import Quote24 from './Quote24'
import type { Props } from './Quote16'

const QuoteResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Quote16 {...props} />,
    },
    <Quote24 {...props} />
  ) as JSX.Element
}

export default QuoteResponsive
