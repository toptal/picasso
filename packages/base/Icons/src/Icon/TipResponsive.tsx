import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Tip16 from './Tip16'
import Tip24 from './Tip24'
import type { Props } from './Tip16'

const TipResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Tip16 {...props} />,
    },
    <Tip24 {...props} />
  ) as JSX.Element
}

export default TipResponsive
