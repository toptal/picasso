import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import CommandKey16 from './CommandKey16'
import CommandKey24 from './CommandKey24'
import type { Props } from './CommandKey16'

const CommandKeyResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <CommandKey16 {...props} />,
    },
    <CommandKey24 {...props} />
  ) as JSX.Element
}

export default CommandKeyResponsive
