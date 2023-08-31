import { useScreens } from '@toptal/picasso-provider'
import React from 'react'

import VideoOn16 from './VideoOn16'
import VideoOn24 from './VideoOn24'
import type { Props } from './VideoOn16'

const VideoOnResponsive = (props: Props) => {
  const screens = useScreens()

  return screens(
    {
      xl: <VideoOn16 {...props} />,
    },
    <VideoOn24 {...props} />
  ) as JSX.Element
}

export default VideoOnResponsive
