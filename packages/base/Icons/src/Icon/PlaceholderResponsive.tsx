import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Placeholder16 from './Placeholder16'
import Placeholder24 from './Placeholder24'
import type { Props } from './Placeholder16'

const PlaceholderResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Placeholder16 {...props} />,
    },
    <Placeholder24 {...props} />
  ) as JSX.Element
}

export default PlaceholderResponsive
