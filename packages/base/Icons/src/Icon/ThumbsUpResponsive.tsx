import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ThumbsUp16 from './ThumbsUp16'
import ThumbsUp24 from './ThumbsUp24'
import type { Props } from './ThumbsUp16'

const ThumbsUpResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ThumbsUp16 {...props} />,
    },
    <ThumbsUp24 {...props} />
  ) as JSX.Element
}

export default ThumbsUpResponsive
