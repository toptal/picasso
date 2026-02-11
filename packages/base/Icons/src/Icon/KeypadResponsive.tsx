import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Keypad16 from './Keypad16'
import Keypad24 from './Keypad24'
import type { Props } from './Keypad16'

const KeypadResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Keypad16 {...props} />,
    },
    <Keypad24 {...props} />
  ) as JSX.Element
}

export default KeypadResponsive
