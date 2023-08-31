import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ArrowLongLeft16 from './ArrowLongLeft16'
import ArrowLongLeft24 from './ArrowLongLeft24'
import type { Props } from './ArrowLongLeft16'

const ArrowLongLeftResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ArrowLongLeft16 {...props} />,
    },
    <ArrowLongLeft24 {...props} />
  ) as JSX.Element
}

export default ArrowLongLeftResponsive
