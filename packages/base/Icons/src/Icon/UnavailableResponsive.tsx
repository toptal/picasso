import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Unavailable16 from './Unavailable16'
import Unavailable24 from './Unavailable24'
import type { Props } from './Unavailable16'

const UnavailableResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Unavailable16 {...props} />,
    },
    <Unavailable24 {...props} />
  ) as JSX.Element
}

export default UnavailableResponsive
