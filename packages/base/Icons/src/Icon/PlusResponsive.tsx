import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Plus16 from './Plus16'
import Plus24 from './Plus24'
import type { Props } from './Plus16'

const PlusResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Plus16 {...props} />,
    },
    <Plus24 {...props} />
  ) as JSX.Element
}

export default PlusResponsive
