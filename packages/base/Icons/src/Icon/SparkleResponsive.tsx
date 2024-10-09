import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Sparkle16 from './Sparkle16'
import Sparkle24 from './Sparkle24'
import type { Props } from './Sparkle16'

const SparkleResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Sparkle16 {...props} />,
    },
    <Sparkle24 {...props} />
  ) as JSX.Element
}

export default SparkleResponsive
