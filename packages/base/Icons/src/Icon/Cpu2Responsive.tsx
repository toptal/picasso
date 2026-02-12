import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Cpu216 from './Cpu216'
import Cpu224 from './Cpu224'
import type { Props } from './Cpu216'

const Cpu2Responsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Cpu216 {...props} />,
    },
    <Cpu224 {...props} />
  ) as JSX.Element
}

export default Cpu2Responsive
