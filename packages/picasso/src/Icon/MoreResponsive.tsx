import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import More16 from './More16'
import More24 from './More24'
import type { Props } from './More16'

const MoreResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <More16 {...props} />,
    },
    <More24 {...props} />
  ) as JSX.Element
}

export default MoreResponsive
