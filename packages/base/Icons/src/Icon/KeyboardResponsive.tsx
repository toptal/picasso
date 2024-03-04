import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Keyboard16 from './Keyboard16'
import Keyboard24 from './Keyboard24'
import type { Props } from './Keyboard16'

const KeyboardResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Keyboard16 {...props} />,
    },
    <Keyboard24 {...props} />
  ) as JSX.Element
}

export default KeyboardResponsive
