import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import KeyboardKey16 from './KeyboardKey16'
import KeyboardKey24 from './KeyboardKey24'
import type { Props } from './KeyboardKey16'

const KeyboardKeyResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <KeyboardKey16 {...props} />,
    },
    <KeyboardKey24 {...props} />
  ) as JSX.Element
}

export default KeyboardKeyResponsive
