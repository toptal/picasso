import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import OnHold16 from './OnHold16'
import OnHold24 from './OnHold24'
import type { Props } from './OnHold16'

const OnHoldResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <OnHold16 {...props} />,
    },
    <OnHold24 {...props} />
  ) as JSX.Element
}

export default OnHoldResponsive
