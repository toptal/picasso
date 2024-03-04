import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Minus16 from './Minus16'
import Minus24 from './Minus24'
import type { Props } from './Minus16'

const MinusResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Minus16 {...props} />,
    },
    <Minus24 {...props} />
  ) as JSX.Element
}

export default MinusResponsive
