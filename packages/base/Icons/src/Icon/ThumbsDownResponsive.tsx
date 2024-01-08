import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import ThumbsDown16 from './ThumbsDown16'
import ThumbsDown24 from './ThumbsDown24'
import type { Props } from './ThumbsDown16'

const ThumbsDownResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <ThumbsDown16 {...props} />,
    },
    <ThumbsDown24 {...props} />
  ) as JSX.Element
}

export default ThumbsDownResponsive
