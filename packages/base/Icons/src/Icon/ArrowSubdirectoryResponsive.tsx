import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ArrowSubdirectory16 from './ArrowSubdirectory16'
import ArrowSubdirectory24 from './ArrowSubdirectory24'
import type { Props } from './ArrowSubdirectory16'

const ArrowSubdirectoryResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ArrowSubdirectory16 {...props} />,
    },
    <ArrowSubdirectory24 {...props} />
  ) as JSX.Element
}

export default ArrowSubdirectoryResponsive
