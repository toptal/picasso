import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Multi16 from './Multi16'
import Multi24 from './Multi24'
import type { Props } from './Multi16'

const MultiResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Multi16 {...props} />,
    },
    <Multi24 {...props} />
  ) as JSX.Element
}

export default MultiResponsive
