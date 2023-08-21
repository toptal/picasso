import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Morning16 from './Morning16'
import Morning24 from './Morning24'
import type { Props } from './Morning16'

const MorningResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Morning16 {...props} />,
    },
    <Morning24 {...props} />
  ) as JSX.Element
}

export default MorningResponsive
