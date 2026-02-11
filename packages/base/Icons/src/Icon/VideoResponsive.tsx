import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import Video16 from './Video16'
import Video24 from './Video24'
import type { Props } from './Video16'

const VideoResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <Video16 {...props} />,
    },
    <Video24 {...props} />
  ) as JSX.Element
}

export default VideoResponsive
