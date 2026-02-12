import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Sleep16 from './Sleep16'
import Sleep24 from './Sleep24'
import type { Props } from './Sleep16'

const SleepResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Sleep16 {...props} />,
    },
    <Sleep24 {...props} />
  ) as JSX.Element
}

export default SleepResponsive
