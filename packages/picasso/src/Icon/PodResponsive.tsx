import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Pod16 from './Pod16'
import Pod24 from './Pod24'
import type { Props } from './Pod16'

const PodResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Pod16 {...props} />,
    },
    <Pod24 {...props} />
  ) as JSX.Element
}

export default PodResponsive
