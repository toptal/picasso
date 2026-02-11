import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import FontSize16 from './FontSize16'
import FontSize24 from './FontSize24'
import type { Props } from './FontSize16'

const FontSizeResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <FontSize16 {...props} />,
    },
    <FontSize24 {...props} />
  ) as JSX.Element
}

export default FontSizeResponsive
