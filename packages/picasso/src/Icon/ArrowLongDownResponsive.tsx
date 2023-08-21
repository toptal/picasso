import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ArrowLongDown16 from './ArrowLongDown16'
import ArrowLongDown24 from './ArrowLongDown24'
import type { Props } from './ArrowLongDown16'

const ArrowLongDownResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ArrowLongDown16 {...props} />,
    },
    <ArrowLongDown24 {...props} />
  ) as JSX.Element
}

export default ArrowLongDownResponsive
